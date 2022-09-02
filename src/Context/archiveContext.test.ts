import axios from "axios";
import { getArchivedNote, deleteFromArchives, restoreFromArchives } from "./archiveContext";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("should return the archived notes when the api call is successful", () => {
    it("should return archived notes", async () => {
        mockedAxios.get.mockResolvedValue({status: 200, data: {
            archivedNotes: [
                {
                    id: "123",
                    title: "meeting",
                    description: "project meeting",
                    pinned: "true"
                },
                {
                    id: "124",
                    title: "read books",
                    description: "Harry Potter",
                    pinned: "false"
                }
            ]
        }})

        const archivedNotes = await getArchivedNote()

        expect(archivedNotes).toEqual(
            [
                {
                    id: "123",
                    title: "meeting",
                    description: "project meeting",
                    pinned: "true"
                },
                {
                    id: "124",
                    title: "read books",
                    description: "Harry Potter",
                    pinned: "false"
                }
            ]
        )

    })

    it("should return email not registered when 404 error is encountered", async() => {
        mockedAxios.get.mockResolvedValue({status: 404, data: "The email is not Registered"})

        const archivedNotes = await getArchivedNote()

        expect(archivedNotes).toEqual("The email is not Registered")
    })

    it("should return handler error when 500 error is encountered", async() => {
        mockedAxios.get.mockRejectedValue({isAxiosError: true, error: "Handler error"})
        mockedAxios.isAxiosError.mockImplementation((payload) => true);
        const archivedNotes = await getArchivedNote()

        expect(archivedNotes).toEqual("Handler error")
    })
})


describe("should delete a note from archived notes",() => {
    const Note = {
            id: "124",
            title: "read books",
            description: "Harry Potter",
            pinned: false,
            tag: "Home",
            priority: "Low",
            selectedBackgroundColor: "violet",
        }
    it("should delete a note from archived notes", async() => {
        mockedAxios.delete.mockResolvedValue({status: 200, data:
            {archivedNotes: [
                {
                    id: "124",
                    title: "read books",
                    description: "Harry Potter",
                    pinned: false,
                    tag: "Home",
                    priority: "Low",
                    selectedBackgroundColor: "violet",
                }]
            }
        })
        const archivedNotes = await deleteFromArchives("123", Note)

        expect(archivedNotes).toEqual(
            [
                {
                    id: "124",
                    title: "read books",
                    description: "Harry Potter",
                    pinned: false,
                    tag: "Home",
                    priority: "Low",
                    selectedBackgroundColor: "violet",
                }]
        )
    })

    it("should return email not registered when 404 error is encountered", async() => {
        mockedAxios.delete.mockResolvedValue({status: 404, data: "The email is not Registered"})

        const archivedNotes = await deleteFromArchives("123", Note);

        expect(archivedNotes).toEqual("The email is not Registered")
    })

    it("should return handler error when 500 error is encountered", async() => {
        mockedAxios.delete.mockRejectedValue({isAxiosError: true, error: "Handler error"})
        mockedAxios.isAxiosError.mockImplementation((payload) => true);

        const archivedNotes = await deleteFromArchives("123", Note);

        expect(archivedNotes).toEqual("Handler error")
    })
})

describe("should restore a note from archived notes", () => {
    it("should restore a note from archived notes", async() => {
        mockedAxios.post.mockResolvedValue({status: 200, data: {
            notesData: [{
                id: "123",
                title: "meeting",
                description: "project meeting",
                pinned: "true"
            }],
            archivedData: [{
                id: "124",
                title: "read books",
                description: "Harry Potter",
                pinned: "false"
            }]
        }})

        const archivedNotes = await restoreFromArchives("124");

        expect(archivedNotes).toEqual({
            notesData: [{
                id: "123",
                title: "meeting",
                description: "project meeting",
                pinned: "true"
            }],
            archivedData: [{
                id: "124",
                title: "read books",
                description: "Harry Potter",
                pinned: "false"
            }]
        })
    })

    it("should return email not registered when 404 error is encountered", async() => {
        mockedAxios.post.mockResolvedValue({status: 404, data: "The email is not Registered"})

        const archivedNotes = await restoreFromArchives("124");

        expect(archivedNotes).toEqual("The email is not Registered")
    })

    it("should return handler error when 500 error is encountered", async() => {
        mockedAxios.post.mockRejectedValue({isAxiosError: true, error: "Handler error"})
        mockedAxios.isAxiosError.mockImplementation((payload) => true);

        const archivedNotes = await restoreFromArchives("124");

        expect(archivedNotes).toEqual("Handler error")
    })
})