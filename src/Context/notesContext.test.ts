import axios from "axios";
import { getNote, addNotes, deleteNotes, updateNotes, archiveNotes } from "./notesContext";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>

describe("should return the notes when the api call is successful", () => {
    it("should return notes", async() => {
        mockedAxios.get.mockResolvedValue({status:200, data:{
            notes: [
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

        const Notes = await getNote();

        expect(Notes).toEqual([
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
        ])
    })

    it("should return error when the status is 500", async() => {
        mockedAxios.get.mockRejectedValue({isAxiosError: true, error: "Handler error"})
        mockedAxios.isAxiosError.mockImplementation((payload) => true);
        const Notes = await getNote();

        expect(Notes).toEqual("Handler error");
    })
})

describe("should add a note when the api call is successful", () => {
    const Note = {
        id: "124",
        title: "read books",
        description: "Harry Potter",
        pinned: false,
        tag: "Home",
        priority: "Low",
        selectedBackgroundColor: "violet",
    }
    it("should add a note", async() => {
        mockedAxios.post.mockResolvedValue({status: 201, data: {
          notes: [
            Note
          ]
        }})

        const Notes = await addNotes(Note);

        expect(Notes).toEqual([
            Note
        ])
    })

    it("should return email not registered when 404 error is encountered", async() => {
        mockedAxios.post.mockResolvedValue({status: 404, data: "The email is not Registered"})

        const Notes = await addNotes(Note);

        expect(Notes).toEqual("The email is not Registered")
    })

    it("should return error when the status is 500", async() => {
        mockedAxios.post.mockRejectedValue({isAxiosError: true, error: "Handler error"})
        mockedAxios.isAxiosError.mockImplementation((payload) => true)
        const Notes = await addNotes(Note);

        expect(Notes).toEqual("Handler error")
    })
})

describe("should delete a note", () => {
    const Note = {
        id: "124",
        title: "read books",
        description: "Harry Potter",
        pinned: false,
        tag: "Home",
        priority: "Low",
        selectedBackgroundColor: "violet",
    }

    it("should delete a note", async() => {
        mockedAxios.delete.mockResolvedValue({status: 200, data:{
            notes: [
                Note
            ]
        }})

        const Notes = await deleteNotes("124", Note);

        expect(Notes).toEqual([
            Note
        ])
    })

    it("should return email not registered when 404 error is encountered", async() => {
        mockedAxios.delete.mockResolvedValue({status: 404, data: "The email is not Registered"})

        const Notes = await deleteNotes("124", Note);

        expect(Notes).toEqual("The email is not Registered")
    })

    it("should return error when the status is 500", async() => {
        mockedAxios.delete.mockRejectedValue({isAxiosError: true, error: "Handler error"})
        mockedAxios.isAxiosError.mockImplementation((payload) => true)
        const Notes = await deleteNotes("124", Note);

        expect(Notes).toEqual("Handler error")
    })

})

describe("should update a note", () => {
    const Note = {
        id: "124",
        title: "read books",
        description: "Harry Potter",
        pinned: false,
        tag: "Home",
        priority: "Low",
        selectedBackgroundColor: "violet",
    }
    it("should update a note when api call is successful", async() => {
        mockedAxios.post.mockResolvedValue({status: 201, data:{
            notes: [
                Note
            ]
        }})

        const Notes = await updateNotes("124", Note);

        expect(Notes).toEqual([
            Note
        ])
    })

    it("should return email not registered when 404 error is encountered", async() => {
        mockedAxios.post.mockResolvedValue({status: 404, data: "The email is not Registered"})

        const Notes = await updateNotes("124", Note);

        expect(Notes).toEqual("The email is not Registered")
    })

    it("should return error when the status is 500", async() => {
        mockedAxios.post.mockRejectedValue({isAxiosError: true, error: "Handler error"})
        mockedAxios.isAxiosError.mockImplementation((payload) => true)
        const Notes = await updateNotes("124", Note);

        expect(Notes).toEqual("Handler error")
    })
})


describe("should archive a note", () => {
    const Note = {
        id: "124",
        title: "read books",
        description: "Harry Potter",
        pinned: false,
        tag: "Home",
        priority: "Low",
        selectedBackgroundColor: "violet",
    }
    it("should archive a note when api call is successful", async() => {
        mockedAxios.post.mockResolvedValue({status: 201, data:{
            notes: [
                Note
            ],
            archivedNotes: [
                Note
            ]
        }})

        const Notes = await archiveNotes("124", Note);

        expect(Notes).toEqual({
            notesData: [
                Note
            ],
            archivedData: [
                Note
            ]
        })
    })

    it("should return email not registered when 404 error is encountered", async() => {
        mockedAxios.post.mockResolvedValue({status: 404, data: "The email is not Registered"})

        const Notes = await archiveNotes("124", Note);

        expect(Notes).toEqual("The email is not Registered")
    })

    it("should return error when the status is 500", async() => {
        mockedAxios.post.mockRejectedValue({isAxiosError: true, error: "Handler error"})
        mockedAxios.isAxiosError.mockImplementation((payload) => true)
        const Notes = await archiveNotes("124", Note);

        expect(Notes).toEqual("Handler error")
    })
})