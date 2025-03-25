import Container from "../components/Container";
import { HeaderCartItem } from "../components/Header/HeaderCart";
import Voucher from "../components/Voucher";
import { Link } from "react-router-dom";
import formatVnd from "../utils/formatVnd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import QuantityCounterCart from "../components/Cart/QuantityCounterCart";
import useWindowResize from "../hooks/useWindowResize";
import { Cart2 } from "../icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeCart } from "@/store/reducers/cartSlice";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "@/components/Breadcrumb";

const title = "Giỏ hàng";

const Cart = () => {
  const { carts, subTotal } = useAppSelector((state) => state.cart);
  const windowWidth = useWindowResize();
  const dispatch = useAppDispatch();

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <Container className="h-full flex flex-col lg:flex-row">
        {carts.length > 0 ? (
          <>
            <div className="lg:w-2/3 flex-none lg:pr-4 mb-10">
              <h1 className="text-[22px] font-medium mb-5">Giỏ hàng của bạn</h1>
              {windowWidth <= 768 ? (
                <ul>
                  {carts.map((cart) => (
                    <HeaderCartItem key={cart._id} {...cart} />
                  ))}
                </ul>
              ) : (
                <table id="cart">
                  <thead>
                    <tr>
                      <th>Thông tin sản phẩm</th>
                      <th>Đơn giá</th>
                      <th>Số lượng</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((cart) => (
                      <tr key={cart._id}>
                        <td>
                          <div className="flex items-center space-x-4">
                            <Link to={`/san-pham/${cart.slug}`}>
                              <LazyLoadImage
                                src={cart.images[0].url}
                                alt={cart.title}
                                effect="opacity"
                                width={110}
                                height={110}
                                wrapperClassName="!block"
                              />
                            </Link>
                            <div>
                              <Link
                                to={`/san-pham/${cart.slug}`}
                                className="hover:text-yellow-primary font-bold"
                              >
                                {cart.title}
                              </Link>
                              <br />
                              <button
                                type="button"
                                title="Xóa"
                                onClick={() => dispatch(removeCart(cart._id))}
                                className="text-yellow-primary font-light"
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="font-semibold text-yellow-primary">
                            {formatVnd(cart.discountedPrice)}
                          </span>
                        </td>
                        <td>
                          <QuantityCounterCart cart={cart} disabledLabel />
                        </td>
                        <td>
                          <span className="font-semibold text-yellow-primary">
                            {formatVnd(cart.discountedPrice * cart.quantity)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className="flex justify-end">
                <div className="mt-5 w-full xl:w-1/3">
                  <div className="flex justify-between items-center mb-3 text-[15px]">
                    <p>Tổng tiền:</p>
                    <span className="text-yellow-primary font-semibold">
                      {formatVnd(subTotal)}
                    </span>
                  </div>
                  <Link
                    to="/thanh-toan"
                    className="text-white bg-yellow-primary py-2 w-full rounded-md text-center block hover:bg-yellow-secondary"
                  >
                    Thanh toán
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 flex-none lg:pl-4 relative">
              <Voucher className="sticky top-10" />
            </div>
          </>
        ) : (
          <div className="w-full mb-10">
            <h1 className="text-[22px] font-medium mb-5">Giỏ hàng của bạn</h1>
            <div className="text-center">
              <Cart2 className="w-20 h-20 mx-auto my-4" />
              <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default Cart;
