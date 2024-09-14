'use server';
import { TAGS } from '@/lib/constants';
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from '@/lib/shopify';
import { revalidatePath, revalidateTag } from 'next/cache';
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
  selectedVariantId: string,
  quantity: number = 1
): Promise<ActionResponse> {
  let cartId =
    cookies().get('cartId')?.value || (await createCartAndSetCookie());
  if (!cartId) return { status: 'error', message: 'Cart ID not found' };

  revalidatePath('/cart');

  try {
    if (!selectedVariantId)
      return { status: 'error', message: 'Variant not selected' };

    await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity }]);
    return {
      status: 'success',
      message: 'Cart action confirmed',
    };
  } catch (e) {
    return { status: 'error', message: 'Error adding item to cart' };
  } finally {
    revalidateTag(TAGS.cart);
  }
}

export async function removeItem(
  merchandiseId: string
): Promise<ActionResponse> {
  try {
    let cartId = cookies().get('cartId')?.value;
    if (!cartId) return { status: 'error', message: 'Missing cart ID' };

    const cart = await getCart(cartId);
    if (!cart) return { status: 'error', message: 'Error fetching cart' };

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );
    if (!lineItem || !lineItem.id)
      return { status: 'error', message: 'Error removing item from cart' };

    await removeFromCart(cartId, [lineItem.id]);
    return { status: 'success', message: 'Cart action confirmed' };
  } catch (e) {
    return { status: 'error', message: 'Error removing item from cart' };
  } finally {
    revalidateTag(TAGS.cart);
  }
}

export async function updateItemQuantity(
  merchandiseId: string,
  quantity: number
): Promise<ActionResponse> {
  let cartId = cookies().get('cartId')?.value;
  if (!cartId) return { status: 'error', message: 'Missing cart ID' };

  try {
    const cart = await getCart(cartId);

    if (!cart) return { status: 'error', message: 'Error fetching cart' };

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart(cartId, [lineItem.id]);
        return { status: 'success', message: 'Item removed from cart' };
      } else {
        await updateCart(cartId, [
          {
            id: lineItem.id,
            merchandiseId,
            quantity,
          },
        ]);
        return { status: 'success', message: 'Item quantity updated' };
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart(cartId, [{ merchandiseId, quantity }]);
      return { status: 'success', message: 'Item added to cart' };
    }
    return { status: 'success', message: 'Cart action confirmed' };
  } catch (e) {
    return { status: 'error', message: 'Error updating item quantity' };
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
