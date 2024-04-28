import { Address } from "@/types/address";

interface FormatAddressOptions {
  short: boolean;
  medium: boolean;
}

export default function formatAddress(
  address?: Address,
  options?: Partial<FormatAddressOptions>
) {
  if (!address) {
    return "";
  }

  let str = "";

  if (options?.short) {
    str = `${address.district}, ${address.province}`;
  } else if (options?.medium) {
    str = `${address.ward}, ${address.district}, ${address.province}`;
  } else {
    str = `${address.detail}, ${address.ward}, ${address.district}, ${address.province}`;
  }

  return str;
}
