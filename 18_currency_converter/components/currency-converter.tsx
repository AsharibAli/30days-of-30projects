"use client"; // Enables client-side rendering for this component

import { useState, useEffect, ChangeEvent } from "react"; // Import React hooks and types
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Import custom Card components
import { Label } from "@/components/ui/label"; // Import custom Label component
import { Input } from "@/components/ui/input"; // Import custom Input component
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select"; // Import custom Select components
import { Button } from "@/components/ui/button"; // Import custom Button component
import ClipLoader from "react-spinners/ClipLoader";

// Define the ExchangeRates type
type ExchangeRates = {
  [key: string]: number;
};

// Define the Currency type
type Currency = "USD" | "EUR" | "GBP" | "JPY" | "AUD" | "CAD" | "PKR";

export default function CurrencyConverter() {
  // State to manage the amount input by the user
  const [amount, setAmount] = useState<number | null>(null);
  // State to manage the source currency selected by the user
  const [sourceCurrency, setSourceCurrency] = useState<Currency>("USD");
  // State to manage the target currency selected by the user
  const [targetCurrency, setTargetCurrency] = useState<Currency>("PKR");
  // State to manage the fetched exchange rates
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  // State to manage the converted amount
  const [convertedAmount, setConvertedAmount] = useState<string>("0.00");
  // State to manage the loading state during data fetch
  const [loading, setLoading] = useState<boolean>(false);
  // State to manage any error messages
  const [error, setError] = useState<string | null>(null);

  // useEffect to fetch exchange rates when the component mounts
  useEffect(() => {
    const fetchExchangeRates = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        setError("Error fetching exchange rates.");
      } finally {
        setLoading(false);
      }
    };
    fetchExchangeRates();
  }, []);

  // Function to handle changes in the amount input field
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAmount(parseFloat(e.target.value));
  };

  // Function to handle changes in the source currency select field
  const handleSourceCurrencyChange = (value: Currency): void => {
    setSourceCurrency(value);
  };

  // Function to handle changes in the target currency select field
  const handleTargetCurrencyChange = (value: Currency): void => {
    setTargetCurrency(value);
  };

  // Function to calculate the converted amount
  const calculateConvertedAmount = (): void => {
    if (sourceCurrency && targetCurrency && amount && exchangeRates) {
      const rate =
        sourceCurrency === "USD"
          ? exchangeRates[targetCurrency]
          : exchangeRates[targetCurrency] / exchangeRates[sourceCurrency];
      const result = amount * rate;
      setConvertedAmount(result.toFixed(2));
    }
  };

  // JSX return statement rendering the Currency Converter UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-md p-6 space-y-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Currency Converter
          </CardTitle>
          <CardDescription>
            Convert between different currencies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center">
              <ClipLoader className="w-6 h-6 text-blue-500" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <div className="grid gap-4">
              {/* Amount input and source currency selection */}
              <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                <Label htmlFor="from">From</Label>
                <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={amount || ""}
                    onChange={handleAmountChange}
                    className="w-full"
                    id="from"
                  />
                  <Select
                    value={sourceCurrency}
                    onValueChange={handleSourceCurrencyChange}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="USD" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                        <SelectItem value="AUD">AUD</SelectItem>
                        <SelectItem value="CAD">CAD</SelectItem>
                        <SelectItem value="PKR">PKR</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Converted amount display and target currency selection */}
              <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                <Label htmlFor="to">To</Label>
                <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                  <div className="text-2xl font-bold">{convertedAmount}</div>
                  <Select
                    value={targetCurrency}
                    onValueChange={handleTargetCurrencyChange}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="EUR" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                        <SelectItem value="AUD">AUD</SelectItem>
                        <SelectItem value="CAD">CAD</SelectItem>
                        <SelectItem value="PKR">PKR</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {/* Convert button */}
          <Button
            type="button"
            className="w-full"
            onClick={calculateConvertedAmount}
          >
            Convert
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
