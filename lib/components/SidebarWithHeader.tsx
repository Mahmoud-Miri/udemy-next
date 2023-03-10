import React, { ReactNode, ReactText } from "react";
import {
  Avatar,
  Box,
  BoxProps,
  Button,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { IconType } from "react-icons";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import {
  FaDoorClosed,
  FaDoorOpen,
  FaHome,
  FaPalette,
  FaSlidersH,
  FaStar,
} from "react-icons/fa";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { FlagIcon } from "react-flag-kit";
import { Select } from "chakra-react-select";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

const SidebarWithHeader = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { t: translate } = useTranslation();

  const LinkItems: Array<LinkItemProps> = [
    { name: translate("generic.home"), icon: FaHome, href: "/" },
    {
      name: translate("generic.customize"),
      icon: FaPalette,
      href: "/customize",
    },
    { name: translate("generic.favourites"), icon: FaStar, href: "/" },
    { name: translate("generic.settings"), icon: FaSlidersH, href: "/" },
    { name: translate("react-table"), icon: FaSlidersH, href: "/react-table" },
  ];
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image
          alt="logo"
          src="/logo_transparent.png"
          width={100}
          height={100}
        />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  href: string;
}
const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      // _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "red.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { user } = useUser();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <HStack spacing={{ base: "1rem", md: "6" }}>
        <Button
          size="sm"
          onClick={toggleColorMode}
          // mr={useBreakpointValue({ base: "1rem", md: 0 })}
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Select
          instanceId="languageSelect1"
          isSearchable={false}
          options={[
            { label: <FlagIcon code="GB" />, value: "en" },
            { label: <FlagIcon code="IR" />, value: "fa" },
          ]}
          size="sm"
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          onChange={async (e) => {
            const selectedLanguage = e?.value;
            await i18n.changeLanguage(selectedLanguage);
          }}
          defaultValue={{
            label: <FlagIcon code="GB" />,
            value: "en",
          }}
        />
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size="sm" src={user?.picture ?? ""} />

                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem
                bg={useColorModeValue("white", "gray.900")}
                _hover={{
                  bg: "red.400",
                  color: "white",
                }}
                _focus={{
                  bg: "red.400",
                  color: "white",
                }}
              >
                {translate("generic.profile")}
              </MenuItem>
              <MenuItem
                bg={useColorModeValue("white", "gray.900")}
                _hover={{
                  bg: "red.400",
                  color: "white",
                }}
                _focus={{
                  bg: "red.400",
                  color: "white",
                }}
              >
                {translate("generic.settings")}
              </MenuItem>
              <MenuDivider />
              <MenuItem
                bg={useColorModeValue("white", "gray.900")}
                _hover={{
                  bg: "red.400",
                  color: "white",
                }}
                _focus={{
                  bg: "red.400",
                  color: "white",
                }}
                onClick={() => {
                  user
                    ? router.push("/api/auth/logout")
                    : router.push("/api/auth/login");
                }}
              >
                <Flex alignItems="center">
                  {user ? <FaDoorOpen size={16} /> : <FaDoorClosed />}
                  <Text ml={2}>
                    {user ? translate("generic.logout") : "Login"}
                  </Text>
                </Flex>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default SidebarWithHeader;
