

export function BalanceComponent({value}){
    return <div className="flex pt-2">
        <div className="font-bold text-lg pl-4">
            Your blanace
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {value}
        </div>
    </div>
}