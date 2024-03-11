function MyCart({cart}) {
    return (
        <>
            {cart.map((item, idx) => (
                <p key={idx}>{idx} - {item.name} </p>
            ))}
        </>
    )
}

export default MyCart;