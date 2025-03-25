import { FullType } from ".";

interface Province {
  name: string;
  slug: string;
  type: string;
  name_with_type: string;
  code: string;
}

interface District extends Province {
  path: string;
  path_with_type: string;
  parent_code: string;
}

interface Ward extends District {}

interface Address {
  ward: string;
  district: string;
  province: string;
  detail: string;
  fullName: string;
  phone: string;
  isDefault: boolean;
}

interface FullAddress extends Address, FullType {}

interface AddressResponse {
  address: FullAddress;
  message: string;
}

export type { Address, FullAddress, AddressResponse, Province, District, Ward };
