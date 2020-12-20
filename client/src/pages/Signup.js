import { Form, Input, Button } from "antd";
import { Layout } from "antd";
import { useHistory } from "react-router-dom";
import { postData } from "../helper/PostData";
import { toast } from "react-toastify";


// const { Content } = Layout;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const Signup = () => {
  let history = useHistory();

  const onFinish = (values) => {
    postData("/api/auth/register", values)
    .then((data) => {
      toast("Successfully registered");
      history.push("/");
    })
    .catch((err) => {
      toast(err?.message || "An error occured");
    });
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        onFinishFailed={onFinishFailed}
      >
        <h1 style={{ textAlign: "center" }}>Register</h1>
        <Form.Item
          name={"firstName"}
          label="First Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"lastName"}
          label="Last Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[{ type: "email", required: true}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name={["user", "password"]}
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;