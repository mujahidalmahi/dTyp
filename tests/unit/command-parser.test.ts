import { describe, it, expect } from "vitest";
import { CommandParser } from "../../apps/vscode/src/parser/command-parser.js";

describe("CommandParser", () => {
  it("parses valid command without arguments", () => {
    const cmd = CommandParser.parse("linkedList>createNode()");
    expect(cmd).not.toBeNull();
    expect(cmd?.category).toBe("linked-list");
    expect(cmd?.component).toBe("createNode");
    expect(cmd?.arguments).toEqual([]);
  });

  it("parses valid command with arguments", () => {
    const cmd = CommandParser.parse("sorting>quickSort(arr, 0, n - 1)");
    expect(cmd).not.toBeNull();
    expect(cmd?.category).toBe("sorting");
    expect(cmd?.component).toBe("quickSort");
    expect(cmd?.arguments).toEqual(["arr", "0", "n - 1"]);
  });

  it("normalizes category aliases", () => {
    const cmd1 = CommandParser.parse("ll>insertAtBeginning()");
    expect(cmd1?.category).toBe("linked-list");

    const cmd2 = CommandParser.parse("dp>knapsack01()");
    expect(cmd2?.category).toBe("dynamic-programming");

    const cmd3 = CommandParser.parse("num>bisectionMethod()");
    expect(cmd3?.category).toBe("numerical-methods");
  });

  it("rejects invalid commands", () => {
    expect(CommandParser.parse("justAFunction()")).toBeNull();
    expect(CommandParser.parse(">createNode()")).toBeNull();
    expect(CommandParser.parse("linkedList>")).toBeNull();
    expect(CommandParser.parse("")).toBeNull();
  });
});
