import axios from "axios";
import { restoredFromTrash } from "./trashContext";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("should restore a note from trash", () => {
  const Note = {
    id: "124",
    title: "read books",
    description: "Harry Potter",
    pinned: false,
    tag: "Home",
    priority: "Low",
    selectedBackgroundColor: "violet",
  };
  it("should restore a note from trash when api call is successful", async () => {
    mockedAxios.post.mockResolvedValue({
      status: 201,
      data: {
        notes: [Note],
      },
    });

    const Notes = await restoredFromTrash(Note);

    expect(Notes).toEqual([Note]);
  });
});
