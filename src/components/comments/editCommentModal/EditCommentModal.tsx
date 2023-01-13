import { Card, Modal, Text, TextField } from '@shopify/polaris';
import React, { useEffect, useState } from 'react'
import { MessageSquare } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, updateComment } from '../../../store/slices/Comments';
import { RootState } from '../../../store/Store';

const EditCommentModal = () => {
    const store = useSelector((state:RootState)=>state.comments)
    const dispatch = useDispatch()
    const [value,setValue] = useState<string>("")
    useEffect(()=>{
        setValue(store.modalData.value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[store.modal])
    const updateCommentHandler =()=>{
        if(value){
            dispatch(updateComment({
                value
            }))
        }
    }
    return (
      <div style={{height: '500px'}}>
        <Modal
        //   activator={activator}
          open={store.modal}
          onClose={()=>{dispatch(closeModal())}}
          title="Edit Comment Here"
          primaryAction={{
            content: 'Update Comment',
            onAction: ()=>{updateCommentHandler()},
          }}
        //   secondaryActions={[
        //     {
        //       content: 'Learn more',
        //       onAction: handleChange,
        //     },
        //   ]}
        >
          <Modal.Section>
           <Card>
            <Text as='h3' variant='headingXl'>
                {`Username : ${store.user}`}
            </Text>
           <div className="inputText" style={{width:"100%"}}> 
        <TextField
          name="comment"
          placeholder="Enter your comment"
          label=""
          autoComplete="off"
          maxHeight={4}
          multiline={true}
          prefix={<MessageSquare size={40} />}
          value={value}
          type="text"
          onChange={(e) => setValue(e)}
          monospaced
        />
      </div>
           </Card>
          </Modal.Section>
        </Modal>
      </div>
  )
}

export default EditCommentModal