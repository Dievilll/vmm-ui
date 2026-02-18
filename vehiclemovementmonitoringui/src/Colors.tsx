import { Button, ConfigProvider, Space, Input, ColorPicker, Divider } from 'antd';
import React from 'react';

const Colors: React.FC = () => {
  const [primary, setPrimary] = React.useState('#00487f');

  return (
    <>
      <ColorPicker showText value={primary} onChange={(color) => setPrimary(color.toHexString())} />
      <Divider />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: primary,
          },
        }}
      >
        <Space>
          <Input placeholder="Please Input" />
          <Button type="primary">Submit</Button>
        </Space>
      </ConfigProvider>
    </>
  );
}

export default Colors;