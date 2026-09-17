import { describe, it, expect } from "vitest";
import { CommandParser } from "../../apps/vscode/src/parser/command-parser.js";

describe("CommandParser", () => {
  it("parses valid command without arguments", () => {
    const cmd = CommandParser.parse("linkedList>createNode()");
    expect(cmd).not.toBeNull();
    expect(cmd?.category).toBe("data-structures");
    expect(cmd?.component).toBe("createNode");
    expect(cmd?.arguments).toEqual([]);
  });

  it("parses valid command with arguments", () => {
    const cmd = CommandParser.parse("sorting>quickSort(arr, 0, n - 1)");
    expect(cmd).not.toBeNull();
    expect(cmd?.category).toBe("algorithms");
    expect(cmd?.component).toBe("quickSort");
    expect(cmd?.arguments).toEqual(["arr", "0", "n - 1"]);
  });

  it("normalizes category aliases", () => {
    const cmd1 = CommandParser.parse("ll>insertAtBeginning()");
    expect(cmd1?.category).toBe("data-structures");

    const cmd2 = CommandParser.parse("dp>knapsack01()");
    expect(cmd2?.category).toBe("algorithms");

    const cmd3 = CommandParser.parse("boiler>main()");
    expect(cmd3?.category).toBe("boiler-plates");

    const cmd4 = CommandParser.parse("academic>fft()");
    expect(cmd4?.category).toBe("academics-programming");
  });

  it("rejects invalid commands", () => {
    expect(CommandParser.parse("justAFunction()")).toBeNull();
    expect(CommandParser.parse(">createNode()")).toBeNull();
    expect(CommandParser.parse("linkedList>")).toBeNull();
    expect(CommandParser.parse("")).toBeNull();
  });
});
