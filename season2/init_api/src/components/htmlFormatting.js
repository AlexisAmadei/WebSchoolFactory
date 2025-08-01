export function HtmlText(props) {
    return <span style={{ color: props.color }} dangerouslySetInnerHTML={{ __html: props.text }} />;
}

export function cutLongText(text) {
    const length = 29;
    if (text.length > length) {
        return text.substring(0, length) + '...';
    }
    return text;
}