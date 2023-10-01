import { Col, Form, message, Modal, Row } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React from 'react';
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { AddPost, UpdatePost } from '../../../apicalls/posts';

function PostForm({ open, setOpen, reloadPosts, setFormType, formType, selectedPost, setSelectedPost }) {

    const { user } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            values.createdBy = user._id;
            let response = null;
            if (formType === "add") {
                response = await AddPost(values);
            } else {
                values._id = selectedPost._id;
                response = await UpdatePost(values);
            }
            if (response.success) {
                message.success(response.message);
                reloadPosts();
                setOpen(false);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
    return (
        <Modal
            title={formType === "add" ? "Dodaj blog" : "Izmeni blog"}
            open={open}
            onCancel={() => setOpen(false)}
            centered
            width={800}
            footer={null}
        >
            <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    ...selectedPost,
                    eventDate: selectedPost?.eventDate
                        ? new Date(selectedPost?.eventDate).toISOString().split("T")[0]
                        : null,
                }}
            >
                <Row gutter={[20]}>
                    <Col span={24}>
                        <FormItem label="Naslov" name="title"
                            rules={[{ required: true, message: 'Please input post title' }]}
                        >
                            <input type="text" />
                        </FormItem>
                    </Col>

                    <Col span={24}>
                        <FormItem label="Opis" name="description"
                            rules={[{ required: true, message: 'Please input post description' }]}
                        >
                            <textarea type="text" />
                        </FormItem>
                    </Col>

                    <Col span={24}>
                        <FormItem label="URL slike" name="image"
                            rules={[{ required: true, message: 'Please input image url' }]}
                        >
                            <input type="text" />
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem label="Datum održavanja" name="eventDate"
                            rules={[{ required: true, message: 'Please input event date' }]}
                        >
                            <input type="date" />
                        </FormItem>
                    </Col>

                </Row>

                <div className="flex justify-end gap-1 mt-1">
                    <Button type="button" color='fourth' title="Otkaži" onClick={() => setOpen(false)} />
                    <Button type="submit" title="Sačuvaj" />
                </div>

            </Form>

        </Modal>
    )
}

export default PostForm