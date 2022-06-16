<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
        <Navbar.Brand href="/">
            <img src={logo} width='60' height='60' alt='' / >
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                {currentUser && (
                <>
                    <Nav.Link href="#features">Персональные задачи</Nav.Link>
                    <Nav.Link href="#pricing">Проекты</Nav.Link>
                </>
                )}
                {showAdminBoard && (
                <NavDropdown title="Управление" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Панель управления</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Сотрудники</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Задачи</NavDropdown.Item>
                </NavDropdown>
                )}
            </Nav>
            <Nav>
            {currentUser ? (
                <>
                    <Nav.Link href={`/user/${currentUser.id}`}>Профиль</Nav.Link>
                    <Nav.Link>
                        <a href='/login' className='nav-link' onClick={logOut}>Выйти</a>
                    </Nav.Link>
                </>
                ) : (
                <>
                    <Nav.Link href={`login`}>Войти</Nav.Link>
                </>
                )}
            </Nav>
            <Nav>
                <Switch 
                    name = 'theme'
                    onChange={()=>{
                    if(window.localStorage.getItem('theme') === 'dark'){
                        window.localStorage.setItem('theme', 'light')
                    } else{   window.localStorage.setItem('theme', 'dark')
                    }
                    window.location.reload()
                    }}
                    checked={window.localStorage.getItem('theme')=== 'dark'}
                /> 
                <div style={{color:'#FFFFFF80', fontSize:'16px'}}>Тема</div>
            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>