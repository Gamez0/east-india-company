export default function SearchInput() {
    return (
        <form action="" method="GET">
            <input name="q" />
            <input type="hidden" name="page" value={1} />
            <button type="submit">검색</button>
        </form>
    );
}
