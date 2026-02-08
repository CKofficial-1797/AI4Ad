import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface CampaignForm {
    budget_type?: "daily" | "lifetime";
    daily_budget?: number;
    lifetime_budget?: number;
    bid_amount?: number;
    start_time?: string;
    end_time?: string;
}

interface BudgetStepProps {
    onNext: () => void;
    onPrev: () => void;
    onUpdate: (data: Partial<CampaignForm>) => void;
    formData: CampaignForm;
}

const BudgetStep: React.FC<BudgetStepProps> = ({ onNext, onPrev, onUpdate, formData }) => {
    const { toast } = useToast();

    const [budgetType, setBudgetType] = useState<"daily" | "lifetime">(formData.budget_type || "daily");
    const [dailyBudget, setDailyBudget] = useState<string>(String(formData.daily_budget || ""));
    const [lifetimeBudget, setLifetimeBudget] = useState<string>(String(formData.lifetime_budget || ""));
    const [bidAmount, setBidAmount] = useState<string>(String(formData.bid_amount || ""));
    const [startDate, setStartDate] = useState<Date | undefined>(
        formData.start_time ? new Date(formData.start_time) : undefined
    );
    const [endDate, setEndDate] = useState<Date | undefined>(
        formData.end_time ? new Date(formData.end_time) : undefined
    );

    const [minLifetimeBudget, setMinLifetimeBudget] = useState(0);

    useEffect(() => {
        if (budgetType === "lifetime" && startDate && endDate && endDate > startDate) {
            const diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            setMinLifetimeBudget(diffDays * 200);
        } else {
            setMinLifetimeBudget(0);
        }
    }, [startDate, endDate, budgetType]);

    const handleSubmit = () => {
        if (!bidAmount) {
            toast({ title: "Error", description: "Please fill out the bid amount." });
            return;
        }

        if (budgetType === "daily") {
            if (!dailyBudget) {
                toast({ title: "Error", description: "Please fill out the daily budget." });
                return;
            }
            if (Number(dailyBudget) < 200) {
                toast({ title: "Error", description: "Daily budget must be at least ₹200." });
                return;
            }
            if (Number(bidAmount) < 1) {
                toast({ title: "Error", description: "Bid amount must be at least ₹1." });
                return;
            }
            onUpdate({
                budget_type: "daily",
                daily_budget: Number(dailyBudget),
                bid_amount: Number(bidAmount),
                lifetime_budget: undefined,
                start_time: undefined,
                end_time: undefined,
            });
        } else {
            if (!lifetimeBudget) {
                toast({ title: "Error", description: "Please fill out the lifetime budget." });
                return;
            }
            if (!startDate || !endDate) {
                toast({ title: "Error", description: "Please select a start and end date." });
                return;
            }
            if (endDate <= startDate) {
                toast({ title: "Error", description: "End date must be after the start date." });
                return;
            }
            if (Number(lifetimeBudget) < minLifetimeBudget) {
                toast({
                    title: "Error",
                    description: `Lifetime budget must be at least ₹${minLifetimeBudget}.`,
                });
                return;
            }
            onUpdate({
                budget_type: "lifetime",
                lifetime_budget: Number(lifetimeBudget),
                bid_amount: Number(bidAmount),
                start_time: startDate.toISOString(),
                end_time: endDate.toISOString(),
                daily_budget: undefined,
            });
        }

        onNext();
    };

    return (
        <div className="space-y-8 p-6 bg-white rounded-xl shadow-md transition-all duration-300">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Campaign Budget</h2>
                <p className="text-gray-600 mt-2">Set your budget and bid amount.</p>
            </div>

            <div className="flex space-x-4">
                <button
                    type="button"
                    onClick={() => setBudgetType("daily")}
                    className={`p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer flex items-start space-x-4 ${budgetType === "daily"
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg"
                        }`}
                >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center 
          ${budgetType === "daily" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}
        `}>
                        <span className="text-xl">🎯</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Daily Budget</h3>
                    </div>
                </button>
                <button
                    type="button"
                    onClick={() => setBudgetType("lifetime")}
                    className={`p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer flex items-start space-x-4 ${budgetType === "lifetime"
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg"
                        }`}
                >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center 
          ${budgetType === "lifetime" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}
        `}>
                        <span className="text-xl">🎯</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Lifetime Budget</h3>
                    </div>
                </button>
            </div>

            <div className="space-y-6">
                {budgetType === "daily" ? (
                    <div className="transition-all duration-300 animate-fadeIn">
                        <label htmlFor="daily-budget" className="block text-sm font-medium text-gray-700 mb-1">
                            Daily Budget
                        </label>
                        <input
                            id="daily-budget"
                            type="text"
                            value={dailyBudget}
                            onChange={(e) => {
                                setDailyBudget(e.target.value);
                            }}
                            placeholder="E.g., 100"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${Number(dailyBudget) < 100 && dailyBudget !== ""
                                ? "border-red-500 focus:ring-red-300"
                                : "border-gray-300 focus:ring-blue-300"
                                }`}
                        />
                        {Number(dailyBudget) < 200 && dailyBudget !== "" && (
                            <p className="mt-1 text-sm text-red-500">Minimum ₹200 required</p>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4 transition-all duration-300 animate-fadeIn">
                        <div>
                            <label htmlFor="lifetime-budget" className="block text-sm font-medium text-gray-700 mb-1">
                                Lifetime Budget
                            </label>
                            <input
                                id="lifetime-budget"
                                type="number"
                                value={lifetimeBudget}
                                onChange={(e) => {
                                    setLifetimeBudget(e.target.value);
                                }}
                                placeholder="E.g., 200"
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${lifetimeBudget === ""
                                        ? "border-gray-300 focus:ring-blue-300"
                                        : Number(lifetimeBudget) < minLifetimeBudget
                                            ? "border-red-500 focus:ring-red-300"
                                            : "border-gray-300 focus:ring-blue-300"
                                    }`}
                            />
                            {lifetimeBudget === "" ? (
                                <p className="mt-1 text-sm text-red-500">This field is required.</p>
                            ) : Number(lifetimeBudget) < minLifetimeBudget && (
                                <p className="mt-1 text-sm text-red-500">
                                    Minimum Rs. {minLifetimeBudget} required.
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Start Date & Time */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Start Date
                                </label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={`w-full justify-start text-left font-normal mt-1 ${!startDate && "text-muted-foreground"
                                                }`}
                                        >
                                            {startDate ? format(startDate, "PPP") : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={startDate}
                                            onSelect={setStartDate}
                                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    End Date
                                </label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={`w-full justify-start text-left font-normal mt-1 ${!endDate && "text-muted-foreground"
                                                }`}
                                        >
                                            {endDate ? format(endDate, "PPP") : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={endDate}
                                            onSelect={setEndDate}
                                            disabled={(date) =>
                                                (startDate && date < startDate) || date < new Date(new Date().setHours(0, 0, 0, 0))
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>
                )}

                <div className="transition-all duration-300 animate-fadeIn">
                    <label htmlFor="bid-amount" className="block text-sm font-medium text-gray-700 mb-1">
                        Bid Amount
                    </label>
                    <input
                        id="bid-amount"
                        type="text"
                        value={bidAmount}
                        onChange={(e) => {
                            setBidAmount(e.target.value);
                        }}
                        placeholder="E.g., 1"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${Number(bidAmount) < 1 && bidAmount !== ""
                            ? "border-red-500 focus:ring-red-300"
                            : "border-gray-300 focus:ring-blue-300"
                            }`}
                    />
                    {Number(bidAmount) < 1 && bidAmount !== "" && (
                        <p className="mt-1 text-sm text-red-500">Minimum ₹1 required</p>
                    )}
                </div>
            </div>

            <div className="flex justify-between pt-4">
                <Button
                    onClick={onPrev}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-6 py-2 rounded-lg transition-colors duration-200"
                >
                    Prev
                </Button>
                <Button
                    onClick={handleSubmit}
                    className="bg-gold hover:bg-gold-600 text-navy font-bold px-6 py-2 rounded-lg shadow-md transition-all duration-200"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default BudgetStep;
