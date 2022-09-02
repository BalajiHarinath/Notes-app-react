import axios from "axios";
import { signedUp, logedin, testlogedin } from "./authContext";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("should sign up the user", () => {
    const user = {
        firstName: "Balaji",
        lastName: "Harinath",
        email: "balaji@gmail.com",
        password: "test@1234",
    }
    it("should sign up the user when the api call is successful", async() => {
        mockedAxios.post.mockResolvedValue({status: 201, data:{
            user
        }})

        const signedup = await signedUp(user)

        expect(signedup).toEqual(user)
    })

    it("should return account already exists message when 422 error is encountered", async() => {
        mockedAxios.post.mockResolvedValue({status: 422, data: "Account already exists"})

        const archivedNotes = await signedUp(user)

        expect(archivedNotes).toEqual("Account already exists")
    })

    it("should return handler error when 500 error is encountered", async() => {
        mockedAxios.post.mockRejectedValue({isAxiosError: true, error: "Handler error"})
        mockedAxios.isAxiosError.mockImplementation((payload) => true);
        const archivedNotes = await signedUp(user)

        expect(archivedNotes).toEqual("Handler error")
    })
})


describe("should login the user", () => {
    const user = {
        firstName: "Balaji",
        lastName: "Harinath",
        email: "balaji@gmail.com",
        password: "test@1234",
    }
    it("should login the user if the credentials are correct", async() => {
        mockedAxios.post.mockResolvedValue({status: 200, data:{
            user
        }})

        const LoggedIn = await logedin(user);

        expect(LoggedIn).toEqual(user)
    })

    it("should return invalid credentials when status 404 is returned", async() => {
        mockedAxios.post.mockResolvedValue({status: 404, data: "Invalid credentials"})
        const LoggedIn = await logedin(user);

        expect(LoggedIn).toEqual("Invalid credentials")
    })

    it("should return invalid credentials when status 401 is returned", async() => {
        mockedAxios.post.mockResolvedValue({status: 401, data: "Invalid credentials"})
        const LoggedIn = await logedin(user);

        expect(LoggedIn).toEqual("Invalid credentials")
    })

    it("should return handler error when 500 error is encountered", async() => {
        mockedAxios.post.mockRejectedValue({isAxiosError: true, error: "Handler error"})
        mockedAxios.isAxiosError.mockImplementation((payload) => true);
        const archivedNotes = await logedin(user)

        expect(archivedNotes).toEqual("Handler error")
    })
})

describe("should test login the user", () => {
    const user = {
        firstName: "Balaji",
        lastName: "Harinath",
        email: "balaji@gmail.com",
        password: "test@1234",
    }
    it("should test login the user if the credentials are correct", async() => {
        mockedAxios.post.mockResolvedValue({status: 200, data:{
            user
        }})

        const LoggedIn = await testlogedin();

        expect(LoggedIn).toEqual(user)
    })

    it("should return invalid credentials when status 404 is returned", async() => {
        mockedAxios.post.mockResolvedValue({status: 404, data: "Invalid credentials"})
        const LoggedIn = await testlogedin();

        expect(LoggedIn).toEqual("Invalid credentials")
    })

    it("should return invalid credentials when status 401 is returned", async() => {
        mockedAxios.post.mockResolvedValue({status: 401, data: "Invalid credentials"})
        const LoggedIn = await testlogedin();

        expect(LoggedIn).toEqual("Invalid credentials")
    })

    it("should return handler error when 500 error is encountered", async() => {
        mockedAxios.post.mockRejectedValue({isAxiosError: true, error: "Handler error"})
        mockedAxios.isAxiosError.mockImplementation((payload) => true);
        const archivedNotes = await testlogedin()

        expect(archivedNotes).toEqual("Handler error")
    })
})