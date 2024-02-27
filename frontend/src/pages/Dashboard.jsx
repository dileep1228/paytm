import { Appbar } from "../components/Appbar"
import { BalanceComponent } from "../components/BalanceComponent"
import { UserComponent } from "../components/UserComponent"

export const Dashboard = () => {
    return <div>
        <Appbar />
        <div className="m-8">
            <BalanceComponent value={"10,000"} />
            <UserComponent />
        </div>
    </div>
}