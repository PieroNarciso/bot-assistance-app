import { Button, View, Text, Form, Input } from "tamagui";
import { useState } from "react";
import { InferType, ValidationError, object, string } from "yup";

const credentialsSchema = object({
  email: string().email().required(),
  password: string().min(8).max(16).required(),
});

type Credentials = InferType<typeof credentialsSchema>;

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    email: "",
    password: "",
  });

  const handlerLoginSubmit = async () => {
    const credentials = {
      email,
      password,
    };

    try {
      await credentialsSchema.validate(credentials, { abortEarly: false });
      setErrorMsg({
        email: "",
        password: "",
      });
      console.log("Validated");
    } catch (error) {
      const errors = {
        email: "",
        password: "",
      } satisfies Credentials;
      if (error instanceof ValidationError) {
        error.inner.forEach((err) => {
          errors[err.path as keyof Credentials] = err.message;
        });
      }
      setErrorMsg(errors);
    }
  };

  return (
    <View alignItems="center" justifyContent="center">
      <View
        marginTop="$20"
        padding="$2"
        width="$20"
        bg="white"
        elevationAndroid={3}
        borderRadius="$2"
      >
        <Form gap="$2" onSubmit={() => console.log("Submit")}>
          <Text alignSelf="center" fontSize="$6">
            Login
          </Text>
          <Input
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Email"
            textContentType="emailAddress"
          />
          <Input
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Password"
            textContentType="password"
          />
          <Form.Trigger asChild>
            <Button color="blue">Submit</Button>
          </Form.Trigger>
        </Form>
      </View>
    </View>
  );
};

export default LoginScreen;
