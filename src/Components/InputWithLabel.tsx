import { Input, Flex, Button, Wrap } from '@chakra-ui/react';
import {
    useDisclosure,

} from '@chakra-ui/react'
import { useRef } from 'react';

import ModalAjouterPlayer from './ModalAjouterPlayer';

const InputWithLabel = ({
   
    id,
    value,
    type = "text",
    onInputChange,
    children
}:any) => {

    //Chakra Modal Settings : Add Player Modal
    const { isOpen: isOpenModal2, onOpen: onOpenModal2, onClose: onCloseModal2 } = useDisclosure();
    const initialRef = useRef(null)

    return (
        <> <label htmlFor={id}>{children}</label>
            &nbsp;
            <div className="form-group d-flex " >
                {/* Search Button */}
                <input data-testid="search" className="form-control" id={id} type={type} value={value} onChange={onInputChange} />
                {/* Add Player Button */}
                <Button
                    type="button"
                    className="btn btn-primary"
                    onClick={onOpenModal2}
                    style={{ marginLeft: '10px' }}
                >
                    Add Player
                </Button>


            </div>



            {/* Modal Add player */}
            <ModalAjouterPlayer
             
              
            
              
                initialRef={initialRef}
                isOpenModal2={isOpenModal2}
                onOpenModal2={onOpenModal2}
                onCloseModal2={onCloseModal2}>

            </ModalAjouterPlayer>

        </>)
}

export default InputWithLabel;