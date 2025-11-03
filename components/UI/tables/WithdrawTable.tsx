import { Withdrawal } from "@/types/Payment";
import OptionsDropdown from "../OptionsDropdown";
import { Edit, Eye, Trash } from "lucide-react";

type WithdrawTableProps = {
  WithdrawData: Withdrawal[];
};

const WithdrawTable: React.FC<WithdrawTableProps> = ({ WithdrawData }) => {
  return (
    <div className="h-full">
      <h2 className="text-lg font-semibold sm:text-start text-center">
        Withdraw History
      </h2>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-[650px] h-full border-collapse ">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 text-sm text-muted-foreground">DATE</th>
              <th className="p-2 text-sm text-muted-foreground">METHOD</th>
              <th className="p-2 text-sm text-muted-foreground">AMOUNT</th>
              <th className="p-2 text-sm text-muted-foreground">STATUS</th>
              <th className="p-2 text-sm text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {WithdrawData.map((withdrawal) => (
              <tr key={withdrawal.id}>
                <td className="p-4">{withdrawal.date}</td>
                <td className="p-4">{withdrawal.method}</td>
                <td className="p-4">{withdrawal.amount}</td>
                <td
                  className={`p-4 ${
                    withdrawal.status === "Pending"
                      ? "text-yellow-500"
                      : withdrawal.status === "Completed"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {withdrawal.status}
                </td>
                <td>
                  <div className="flex justify-center items-center">
                    <OptionsDropdown
                      actions={[
                        {
                          label: "View",
                          icon: <Eye className="w-4 h-4" />,
                          onClick: () => console.log("View clicked"),
                        },
                        {
                          label: "Edit",
                          icon: <Edit className="w-4 h-4" />,
                          onClick: () => console.log("Edit clicked"),
                        },
                        {
                          label: "Delete",
                          icon: <Trash className="w-4 h-4" />,
                          onClick: () => console.log("Delete clicked"),
                          danger: true,
                        },
                      ]}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default WithdrawTable;
