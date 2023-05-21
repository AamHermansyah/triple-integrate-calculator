import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import * as React from "react";

const debug = true;

const initialState = {
  amount: "2.00",
  orderID: "",
  onApproveMessage: "",
  onErrorMessage: ""
};

export default class Donate extends React.Component<{}, typeof initialState> {
  constructor(props: any) {
    super(props);
    this.state = initialState;

    this.onChange = this.onChange.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.onApprove = this.onApprove.bind(this);
    this.onError = this.onError.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (+event.target.value > 0) {
      this.setState({
        amount: event.target.value,
        orderID: "",
        onApproveMessage: "",
        onErrorMessage: ""
      });

      return;
    }

    event.target.value = '0';
  }

  createOrder(data: Record<string, unknown>, actions: any) {
    if (debug) console.log("Creating order for amount", this.state.amount);
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: this.state.amount
            }
          }
        ]
      })
      .then((orderID: any) => {
        this.setState({ orderID: orderID });
        return orderID;
      });
  }

  onApprove(data: any, actions: any) {
    let app = this;
    return actions.order.capture().then(function (details: any) {
      app.setState({
        onApproveMessage: `Transaction completed by ${details.payer.name.given_name}!`
      });
    });
  }

  onError(err: Record<string, unknown>) {
    this.setState({
      onErrorMessage: err.toString()
    });
  }

  onClick() {
    if (debug) console.log("When clicked, amount was", this.state.amount);
  }

  render() {
    return (
      <div className="bg-white mt-10 text-gray-800 p-4 rounded">
        <h1 className="text-2xl font-bold tracking-widest uppercase text-center">
          DONATE
        </h1>

        {this.state.onApproveMessage && (
          <div className="text-center">
            <h2 className="my-4 text-2xl font-bold">
              ORDER ID: {this.state.orderID}
            </h2>
            <p className="text-lg">
              {this.state.onApproveMessage}
            </p>
            <span className="mt-4 text-sm text-sky-500 font-bold">
              Thanks for your support^^
            </span>
          </div>
        )}

        {this.state.onErrorMessage && (
          <div className="text-center">
            <h2 className="mt-4 text-2xl font-bold">
              {this.state.onApproveMessage || 'Server error with 500'}
            </h2>
            <span className="text-sm text-sky-500 font-bold">
              Try again later:(
            </span>
          </div>
        )}

        <div className="flex my-4">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            $
          </span>
          <input
            type="number"
            onChange={this.onChange}
            name="amount"
            id="amount"
            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-4 outline-none"
            placeholder="Enter amount"
            defaultValue={2}
            onKeyDown={(evt) => {
              return ['e', 'E', '+', '-', '.'].includes(evt.key) && evt.preventDefault();
            }}
          />
        </div>

        <PayPalScriptProvider
          options={{
              "client-id": "AVTXuMYmbq9ptBNoPMElwdAL6icpRdoC7yMuhf7Co8vU0jbxozHQEu8B-mlRW3Q14GcA66_s00z6mjUb"
            }}
          >
          <PayPalButtons
            createOrder={this.createOrder}
            onApprove={this.onApprove}
            onError={this.onError}
            onClick={this.onClick}
          />
        </PayPalScriptProvider>
      </div>
    );
  }
}

