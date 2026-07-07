export function Navbar() {
  return (
    <>
      <nav id="nav">
    <div className="wrap nav-inner">
      <div className="nav-logo">
        <div className="nav-logo-box">VR</div>
        Vishal R
      </div>
      <div className="nav-links">
        <a href="#home" className="active">home</a>
        <a href="#about">about</a>
        <a href="#skills">skills</a>
        <a href="#projects">projects</a>
        <a href="#education">education</a>
        <a href="#contact">contact</a>
      </div>
      <div className="nav-badge"> Available for work</div>
      <button className="nav-burger" id="burger" aria-label="Menu">
        <span /><span /><span />
      </button>
    </div>
  </nav>
  <div id="nav-mob">
    <a href="#home">home</a><a href="#about">about</a><a href="#skills">skills</a>
    <a href="#projects">projects</a><a href="#education">education</a><a href="#contact">contact</a>
  </div>
    </>
  );
}
