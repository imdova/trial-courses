import WalletTable from "@/components/UI/tables/WalletTable";
import { Courses } from "@/constants/wallet.data";

export default function WalletPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Wallet</h2>
      <WalletTable courses={Courses} />
    </div>
  );
}
