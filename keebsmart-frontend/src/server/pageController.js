export const GoToPage = (href, time) => {
    setTimeout(() => {
        window.location.href = href;
    }, time);
}