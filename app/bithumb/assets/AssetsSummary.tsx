export default function AssetsSummary() {
    const totalAssets = 20261;
    const profit = 273;
    const profitRate = 5.48;
    return (
        <div>
            <h1>{totalAssets}</h1>
            <p>
                {profit} ({profitRate}%)
            </p>
        </div>
    );
}
