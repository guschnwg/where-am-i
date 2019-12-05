export default (milli: number) => {
    const minutes = Math.floor(milli / 1000 / 60)
    const seconds = Math.floor((milli - minutes * 1000 * 60) / 1000)

    return {
        minutes,
        seconds,
    }
}