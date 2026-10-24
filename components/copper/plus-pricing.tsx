import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  formatMemory,
  formatNotesHours,
  formatUsd,
  getPlans,
  type Plan,
} from "@/lib/copper/catalog";

// One row per plan detail; every value comes from the catalog.
const ROWS: { label: string; value: (plan: Plan) => string }[] = [
  { label: "Monthly price", value: (plan) => `${formatUsd(plan.monthlyUsd)}/month` },
  { label: "Annual price", value: (plan) => `${formatUsd(plan.annualUsd)}/year` },
  { label: "Memory kept", value: (plan) => formatMemory(plan.memoryDays) },
  {
    label: "Notes recording",
    value: (plan) => formatNotesHours(plan.notesHoursPerMonth),
  },
  {
    label: "Refined answers",
    value: (plan) => (plan.refinedAnswers ? "Included" : "Not included"),
  },
];

const isPlus = (plan: Plan) => plan.id === "copper-plus";

export function PlusPricing() {
  const plans = getPlans();

  return (
    <section data-testid="plus-pricing" id="plus" className="w-full">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:py-24">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold md:text-4xl">Copper Plus</h2>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Every device works on the free plan. Copper Plus keeps your history
            longer and adds Refined answers for bigger questions.
          </p>
        </div>
        <Card className="py-0">
          <Table className="text-base">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-12 px-4">
                  <span className="sr-only">Plan detail</span>
                </TableHead>
                {plans.map((plan) => (
                  <TableHead
                    key={plan.id}
                    scope="col"
                    className={cn(
                      "h-12 px-4 text-lg font-bold",
                      isPlus(plan) && "bg-primary text-primary-foreground",
                    )}
                  >
                    {plan.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((row) => (
                <TableRow key={row.label} className="hover:bg-transparent">
                  <TableHead scope="row" className="text-muted-foreground px-4">
                    {row.label}
                  </TableHead>
                  {plans.map((plan) => (
                    <TableCell
                      key={plan.id}
                      className={cn(
                        "px-4 py-3",
                        isPlus(plan) && "bg-primary/10 font-semibold",
                      )}
                    >
                      {row.value(plan)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </section>
  );
}
