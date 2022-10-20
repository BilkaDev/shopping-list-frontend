import React, { useState } from "react";
import {
    Box,
    Flex,
    Image,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    Text,
} from "@chakra-ui/react";
import defaultIcon from "../../../assets/default-icon-profil.jpg";
import { useHttpClient } from "../../hooks/http-hook";
import { LoadingSpinner } from "../UiElements/LoadingSpinner";
import { InfoModal } from "../UiElements/InfoModal";
import { ModalChakra } from "../UiElements/ModalChakra";
import { EditPasswordForm } from "./EditPasswordForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/actions/auth";


export function MenuHeader() {
    const [isEditPassword, setIsEditPassword] = useState(false);
    const { sendRequest, error, clearError, isLoading } = useHttpClient();
    const nav = useNavigate();
    const dispatch = useDispatch();

    //@Todo Added avatar user and auth user full name.
    const avatarUrl = null;
    const userFullName = "Test Test";

    const logoutClick = async () => {
        const data = await sendRequest("/auth/logout", "POST");
        if (data.isSuccess) {
            dispatch(logout())
            nav("/");
        }
    };

    return (
        <>
            {isLoading && <LoadingSpinner/>}
            {error && <InfoModal isError message={error} onClose={clearError} title={"Failed!"}/>}
            <ModalChakra title="Change password" isOpen={isEditPassword} onClose={() => setIsEditPassword(false)}>
                <EditPasswordForm/>
            </ModalChakra>
            <Menu autoSelect={false}>
                <MenuButton>
                    <Flex align="center"
                          justify="space-between" w="260px">
                        <Box>
                            <Flex
                                align="center">
                                <Image
                                    width="45"
                                    height="45"
                                    borderRadius="full"
                                    objectFit="cover"
                                    src={avatarUrl ? avatarUrl : defaultIcon}
                                    alt="user profil icon"
                                    alignItems="center"
                                    mr="10px"
                                />
                                <Text fontSize="18px">{userFullName}</Text>
                            </Flex>
                        </Box>
                        <Box w={0} h={0} borderTop="5px solid #9e9e9e" borderLeft="5px solid transparent"
                             borderRight="5px solid transparent">
                        </Box>
                    </Flex>
                </MenuButton>
                <MenuList borderRadius={0} bgColor="var(--dark)" borderColor="var(--dark)">
                    <MenuGroup title="Profile">
                        <MenuItem onClick={() => setIsEditPassword(true)} _hover={{ backgroundColor: "#292A2B" }}>Change
                            password</MenuItem>
                        <MenuItem onClick={logoutClick} _hover={{ backgroundColor: "#292A2B" }}>Logout </MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>
        </>
    );
}

