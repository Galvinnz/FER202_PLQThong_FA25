import React, { useState } from "react";
import {
  Form,
  Button,
  InputGroup,
  Card,
  Row,
  Col
} from "react-bootstrap";
import { Person } from "react-bootstrap-icons";

export default function FlightSimpleForm() {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    from: "Hà nội",
    to: "Hà nội",
    oneWay: false,
    roundTrip: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đặt vé thành công cho ${form.fullName}!`);
  };

  return (
    <Card className="p-4 shadow mt-4" style={{ maxWidth: 500, margin: "auto" }}>
      <h3 className="text-center mb-4">Form đặt vé máy bay</h3>

      <Form onSubmit={handleSubmit}>
        {/* Họ tên */}
        <Form.Group className="mb-3">
          <Form.Label>Họ tên</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <Person />
            </InputGroup.Text>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Họ tên"
              required
              value={form.fullName}
              onChange={handleChange}
            />
            <InputGroup.Text>vnd</InputGroup.Text>
          </InputGroup>
          <Form.Text className="text-muted">
            Phải nhập 5 ký tự, in hoa đầu mỗi từ.
          </Form.Text>
        </Form.Group>

        {/* Địa chỉ */}
        <Form.Group className="mb-3">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Nhập địa chỉ"
            required
            value={form.address}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Phải nhập 5 ký tự, in hoa đầu mỗi từ.
          </Form.Text>
        </Form.Group>

        {/* Đi từ / Đến */}
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Đi từ</Form.Label>
            <Form.Select
              name="from"
              value={form.from}
              onChange={handleChange}
            >
              <option>Hà nội</option>
              <option>Đà Nẵng</option>
              <option>TP. Hồ Chí Minh</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Đến</Form.Label>
            <Form.Select
              name="to"
              value={form.to}
              onChange={handleChange}
            >
              <option>Hà nội</option>
              <option>Đà Nẵng</option>
              <option>TP. Hồ Chí Minh</option>
            </Form.Select>
          </Form.Group>
        </Row>

        {/* Checkbox */}
        <Form.Group className="mb-4">
          <Form.Label>Chọn chiều đi (Khứ hồi)</Form.Label>
          <div>
            <Form.Check
              inline
              type="checkbox"
              label="Đi"
              name="oneWay"
              checked={form.oneWay}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Về"
              name="roundTrip"
              checked={form.roundTrip}
              onChange={handleChange}
            />
          </div>
        </Form.Group>

        {/* Submit */}
        <div className="text-center">
          <Button type="submit" variant="primary">
            Đặt vé
          </Button>
        </div>
      </Form>
    </Card>
  );
}
