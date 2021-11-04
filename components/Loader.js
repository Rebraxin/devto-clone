const Loader = (props) => {
  const { show } = props

  return show ? <div className="loader" /> : null
}

export default Loader
