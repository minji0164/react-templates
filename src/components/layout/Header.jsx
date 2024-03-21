import React, { useEffect, useState } from "react";
import {
  Box,
  ButtonGroup,
  Button,
  Heading,
  IconButton,
  Container,
} from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Gnb from "./Gnb";
import gsap from "gsap";

const Header = () => {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navBar = document.querySelector(".nav-bar__wrapper");
      const navBeltHeight =
        document.querySelector(".nav-belt__wrapper")?.offsetHeight || 0;
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;

      // 스크롤 위치에 따라 스타일 업데이트
      if (scrollPosition > navBeltHeight) {
        // 헤더 스타일 업데이트
        navBar.style.position = "fixed";
        navBar.style.width = "100%";
        document.getElementById("header").style.top = "-32px";
      } else {
        // 스크롤 발생 시 헤더 위치 업데이트
        setIsScroll(true);
        document.getElementById("header").style.top = -scrollPosition + "px";
      }
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 클린업: 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const navBar = document.querySelector(".nav-bar__wrapper");
    const navBarHeight = navBar.offsetHeight;
    const swiperHeight = document.querySelector(".topCont")?.offsetHeight || 0;

    // 스크롤 위치에 따라 스타일 업데이트
    if (scrollY > swiperHeight - navBarHeight) {
      // gsap를 사용하여 스타일 변경
      gsap.to(navBar, {
        backgroundColor: "#fff",
        duration: 0.5,
        boxShadow: "0 1px 4px 0 rgba(0,0,0,.07)",
      });

      gsap.to(navBar.querySelectorAll("button, a"), {
        color: "#000",
        duration: 0.5,
      });
    } else {
      // 스크롤 위치가 swiperHeight - navBarHeight보다 작을 때 스타일 초기화
      gsap.to(navBar, {
        backgroundColor: "",
        duration: 0.5,
      });
    }
  };

  // 스크롤 이벤트 리스너 등록
  window.addEventListener("scroll", handleScroll);

  // Header 컴포넌트 JSX
  return (
    <Box
      as="header"
      id="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      minH="92px"
      bg={isScroll ? "rgba(0,0,0,.1)" : "transparent"}
      backdropFilter={isScroll ? "saturate(180%) blur(15px)" : "none"}
    >
      {/* 큰 화면용 네비게이션 벨트 */}
      <Box
        className="nav-belt__wrapper"
        display={["none", null, null, null, "block"]}
        h="32px"
        bg="rgba(0,0,0,.6)"
      >
        <Container
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* 네비게이션 링크용 ButtonGroup */}
          <ButtonGroup gap="10px">
            <Button colorScheme="teal" variant="link12">
              공공 기관용
            </Button>
            <Button colorScheme="teal" variant="link12">
              금융 클라우드
            </Button>
          </ButtonGroup>
          {/* 로그인, 회원가입, 언어 선택용 ButtonGroup */}
          <ButtonGroup gap="10px">
            <Button colorScheme="teal" variant="link12">
              로그인
            </Button>
            <Button colorScheme="teal" variant="link12">
              회원가입
            </Button>
            <Button colorScheme="teal" variant="link12">
              Languages
            </Button>
          </ButtonGroup>
        </Container>
      </Box>
      {/* 헤더 */}
      <Box className="nav-bar__wrapper" bg="rgba(0,0,0,.05)">
        <Container
          display="flex"
          h="60px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading as="h1" fontSize={24} color="white">
            <Link to="/">Dashboard</Link>
          </Heading>

          <Gnb />
          <ButtonGroup color="white">
            <IconButton
              variant="ghost"
              aria-label="Search database"
              icon={<SearchIcon />}
              color="white"
            />
            <IconButton
              variant="ghost"
              aria-label="Light database"
              icon={<SunIcon />}
              color="white"
            />
            <IconButton
              variant="ghost"
              aria-label="전체 메뉴"
              icon={<HamburgerIcon />}
              display={{ sm: "block", lg: "none" }}
              color="white"
            />
          </ButtonGroup>
        </Container>
      </Box>
    </Box>
  );
};

export default Header;
