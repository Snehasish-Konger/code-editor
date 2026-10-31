import { render, screen } from "@testing-library/react";
import OutputWindow from "./OutputWindow";
import { encodeBase64 } from "../utils/base64";

describe("OutputWindow", () => {
  it("renders decoded stdout on success", () => {
    render(
      <OutputWindow
        outputDetails={{ status: { id: 3 }, stdout: encodeBase64("héllo 🚀") }}
      />
    );
    expect(screen.getByText("héllo 🚀")).toBeInTheDocument();
  });

  it("renders nothing when output fields are null", () => {
    const { container } = render(
      <OutputWindow
        outputDetails={{ status: { id: 3 }, stdout: null, stderr: null }}
      />
    );
    expect(container.querySelector("pre")).toHaveTextContent(/^$/);
  });

  it("renders compile errors", () => {
    render(
      <OutputWindow
        outputDetails={{
          status: { id: 6 },
          compile_output: encodeBase64("error: expected ';'"),
        }}
      />
    );
    expect(screen.getByText("error: expected ';'")).toBeInTheDocument();
  });
});
