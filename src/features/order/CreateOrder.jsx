/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

import { Form, useActionData, useNavigation } from "react-router-dom";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// // https://uibakery.io/regex-library/phone-number

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const formErrors = useActionData();
  const isSubmitting = navigation.state === "submitting";
  const {
    username,
    address,
    position,
    status: addressStatus,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const cart = useSelector(getCart);
  const TotalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = !withPriority ? 0 : 0.2;
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input  w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className=" relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className=" sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input  w-full"
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          <span className="absolute right-[3px] top-[50%] sm:right-[3px] sm:top-[3px] md:right-[5px] md:top-[5px]">
            {!position.longitude && !position.latitude && (
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                get Position
              </Button>
            )}
          </span>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="focus: h-6 w-6 accent-yellow-400 focus:outline-none
            focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={
            position.latitude && position.longitude
              ? `${position.latitude},${position.longitude}`
              : ""
          }
        />
        <div>
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? "placing order..."
              : `Order now from ${formatCurrency(
                  TotalCartPrice + priorityPrice,
                )}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
