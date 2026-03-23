export default async function Page({
    props,
}: {
    props: Promise<{ postId: string }>;
}) {
    const { postId } = await props;
    const response = await fetch(`url/${postId}`);
    const postDetail = await response.json();
    return <main>PostId: {postId}</main>;
}
