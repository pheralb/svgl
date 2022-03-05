import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Button,
} from "@chakra-ui/react";
import Search from "components/search";
import { IoSearch } from "react-icons/io5";

const ModalSearch = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label="Search Icon"
        bg="transparent"
        icon={<IoSearch size="25"/>}
        onClick={onOpen}
        {...props}
      />
      <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="light">Search</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="5">
            <Search />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalSearch;
