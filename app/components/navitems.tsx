import { Flex, Icon, Link, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";

interface NavItemProps {
  icon: IconType;
  label: string;
  href: string;
  data: string;
}

export default function NavItem({ icon, label, href, data }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      w="100%"
      _hover={{ textDecoration: "none" }}
      data-id={data}
    >
      <Flex
        align="center"
        p={4}
        borderRadius="md"
        bg={isActive ? "blue.600" : "transparent"}
        color="white"
        _hover={{ bg: "blue.700" }}
        justifyContent="flex-start"
      >
        <Icon as={icon} fontSize="xl" />
        <Text ml={4} fontSize="md">
          {label}
        </Text>
      </Flex>
    </Link>
  );
}
