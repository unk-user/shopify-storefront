'use server';
import { TAGS } from '@/lib/constants';
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from '@/lib/shopify';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface ActionResponse {
  status: 'success' | 'error';
  message: string;
}

export async function createCartAndSetCookie() {
  let cart = await createCart();
  cookies().set('cartId', cart.id!);
  return cart.id;
}

export async function addItem(
  prevState: any,
  {
    selectedVariantId,
    quantity = 1,
  }: { selectedVariantId?: string; quantity?: number }
): Promise<ActionResponse> {
  let cartId =
    cookies().get('cartId')?.value || (await createCartAndSetCookie());

  if (!cartId) return { status: 'error', message: 'Cart ID not found' };
  if (!selectedVariantId)
    return { status: 'error', message: 'Variant not selected' };

  try {
    const { userErrors } = await addToCart(cartId, [
      { merchandiseId: selectedVariantId, quantity },
    ]);

    return {
      status: 'success',
      message: 'Cart action confirmed',
    };
  } catch (e) {
    console.log(e);
    return { status: 'error', message: 'Error adding item to cart' };
  } finally {
    revalidateTag(TAGS.cart);
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  let cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  try {
    const cart = await getCart(cartId);

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      await removeFromCart(cartId, [lineItem.id]);
      revalidateTag(TAGS.cart);
    } else {
      return 'Item not found in cart';
    }
  } catch (e) {
    revalidateTag(TAGS.cart);
    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  let cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart(cartId);

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart(cartId, [lineItem.id]);
      } else {
        await updateCart(cartId, [
          {
            id: lineItem.id,
            merchandiseId,
            quantity,
          },
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart(cartId, [{ merchandiseId, quantity }]);
    }
  } catch (e) {
    return 'Error updating item quantity';
  } finally {
    revalidateTag(TAGS.cart);
  }
}

export async function redirectToCheckout() {
  let cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  let cart = await getCart(cartId);

  if (!cart) {
    return 'Error fetching cart';
  }

  redirect(cart.checkoutUrl);
}
