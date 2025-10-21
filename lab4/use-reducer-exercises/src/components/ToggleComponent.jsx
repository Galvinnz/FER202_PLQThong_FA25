import React, { useReducer } from "react";
import { Button, Card } from "react-bootstrap";

// 1. Trạng thái khởi tạo
const initialState = { isOn: false };

// 2. Hàm reducer
function reducer(state, action) {
  switch (action.type) {
    case "TURN_ON":
      return { isOn: true };
    case "TURN_OFF":
      return { isOn: false };
    default:
      return state;
  }
}

// 3. Component chính
function ToggleComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const buttonStyle = {
    margin: "5px",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    minWidth: "100px",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40px",
        marginBottom: "40px",
      }}
    >
      <Card
        style={{
          width: "420px",
          padding: "25px",
          textAlign: "center",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          borderRadius: "15px",
          border: "2px solid #f0f0f0",
        }}
      >
        <h2 style={{ fontWeight: "700", fontSize: "22px", marginBottom: "15px" }}>
          Bật/Tắt trạng thái
        </h2>

        <p
          style={{
            fontSize: "18px",
            fontWeight: "500",
            marginBottom: "20px",
          }}
        >
          Trạng thái hiện tại:{" "}
          <span style={{ color: state.isOn ? "green" : "red", fontWeight: "600" }}>
            {state.isOn ? "BẬT" : "TẮT"}
          </span>
        </p>

        <div>
          <Button
            onClick={() => dispatch({ type: "TURN_ON" })}
            style={{ ...buttonStyle, background: "#28a745", color: "white" }}
          >
            Bật
          </Button>

          <Button
            onClick={() => dispatch({ type: "TURN_OFF" })}
            style={{ ...buttonStyle, background: "#dc3545", color: "white" }}
          >
            Tắt
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default ToggleComponent;
