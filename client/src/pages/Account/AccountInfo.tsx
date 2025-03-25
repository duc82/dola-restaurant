import { useAppSelector } from "@/store/hooks";
import formatAddress from "@/utils/formatAddress";

const AccountInfo = () => {
  const { user } = useAppSelector((state) => state.user);
  const { addresses } = useAppSelector((state) => state.address);

  const address = addresses.find((address) => address.isDefault);

  return (
    <div>
      <h1 className="uppercase text-lg mb-7">Thông tin tài khoản</h1>
      <div className="flex flex-col space-y-4">
        <p>
          <strong>Họ tên: </strong> {user?.fullName}
        </p>
        <p>
          <strong>Email: </strong> {user?.email}
        </p>
        <p>
          <strong>Điện thoại: </strong> {user?.phone}
        </p>
        {address && (
          <p>
            <strong>Địa chỉ: </strong> {formatAddress(address)}
          </p>
        )}
      </div>
    </div>
  );
};

export default AccountInfo;
