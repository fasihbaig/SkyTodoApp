import { faker } from "@faker-js/faker";
import { createHash } from "crypto";
import { UserNS } from "../data-access-layer";
import { UserService } from "../service";


(async () => {
    const name = faker.name.firstName();
    const randomGeneratedGender = Object.values(UserNS.Gender)[(parseInt(faker.random.numeric(2), 10) % 3)];
    // const user = await UserService.createUser({
    //     name,
    //     username: `${name}_${faker.random.numeric(4)}`,
    //     email: faker.internet.email(name),
    //     avatar: faker.image.avatar(),
    //     password: createHash('md5').update("password").digest('hex'),
    //     gender: randomGeneratedGender
    // });
})


