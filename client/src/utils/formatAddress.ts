import { Address } from "@/types/address";

export function formatAddress(address?: Address, isShort?: boolean) {
  if (!address) {
    return "";
  }

  if (isShort) {
    return `${address.district}, ${address.province}`;
  }

  return `${address.detail}, ${address.ward}, ${address.district}, ${address.province}`;
}
