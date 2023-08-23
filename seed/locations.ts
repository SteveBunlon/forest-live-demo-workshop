import { faker } from '@faker-js/faker';
import { PoolClient, QueryResult } from 'pg';

faker.locale = 'en_US';

/**
 * Populate coach_skill
 * @returns Promise<string[]>
 */
export default async function populateLocations(client: PoolClient): Promise<string[]> {
    const ids: string[] = [];

    // Delete existing data from coach_skill table
    await client.query('DELETE FROM "location"');

    // Insert 300 fake coach_skill
    // @todo avoid multiple sessionTypeId for same coachId
    for (let i = 0; i < 70; i++) {
        const location = {
            country: faker.address.country(),
            city: faker.address.city(),
            number: faker.address.buildingNumber(),
            street: faker.address.street(),
            picture: ['https://media.istockphoto.com/id/511061090/photo/business-office-building-in-london-england.jpg?s=612x612&w=0&k=20&c=nYAn4JKoCqO1hMTjZiND1PAIWoABuy1BwH1MhaEoG6w=', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH8AvgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBgIEBQEHAP/EAD0QAAIBAwIEBAMHAwIEBwAAAAECAwAEERIhBTFBUQYTImFxgZEjMkKhscHRFFLwFeEWM2JyJCVDU2OCkv/EABoBAAMBAQEBAAAAAAAAAAAAAAEDBAIABQb/xAAmEQACAgIBBAIBBQAAAAAAAAAAAQIRAyESBBMxQSJRFDIzUqHh/9oADAMBAAIRAxEAPwA8QyuDXfL3qcK1ZCbV9U5UfKqNoHHHtVmNBXEWjKu4pcmOhEmFoqg7VwLRAKU2PSDxcqOhqohxR1alSQyLLsDUc1TiODRw1TyWxyeggNdzQ81XvrxLOEO4LOzaI415u3Yf5sKFBbS8nb7iMFm0McuppJmwqIMnHVsdh/tVpGWRA6EMrDII5EUm38jx8Tiee4CyS7eYi6hIyt9xP+lc7nuO5NbnD7tLa1gMh0oyoGB/CSNmHsa1WhayfKma+O1TUV8o61MCltjkcIroFdr6snHMCompNtUDyrjjhoT1OoNW0BgnFAYb1ZYUJhvTExbQrRpirCCogUVBV7ZDFHQlEXapKK7jelt2MSOiiLUAKmgPass2dqaZoqxjapiOsOSNqJ1OdHU0JF3o7RGOF5ZsxIoyxbbApMmhkUzjNpGcE52AG5PwFKnGL0R/+YXuRHHKU0q2G3BzGnv/AHN0+mNC+8RQ8PN1Pc/YpAFVT+MalzhR/wC4d/8AtH5+ecU4jNxSSOaVdEYwsMAP3V7fuT1NHHFtis8lGKZZj4lPxDjttdXEgjAZRGiDCxqOQUdhTXZ3LAW6SEAqyupIzp7kdweo+dI9g2nilvhlJ1DLEZHwFNqf8q3CkgZQkdV9x7VQ4qqIubtMb7W8Ec/kafRpB23Eft7qehrUyM4yAcZxSnBO0dypzk+Xtv6cZH1HcdOlfRSTJdre+cSdOgAnJXfl8MCpJY2ehjyXoba+xQbO5W7hDoMH8S9jR+VJsoIkVAiiGo42ogBEVDFEYVzFbs4GVqBUUdhQyKKZloWAmKKi0TyjU1QjpVzkRKJ8q1MR+1dVT2o6rSnIaoghHU1X2o6x1IR4rLmbUT5EzvWrbcLaWDW7BWK5UfzVO1iMsqoBz5+1MUYAXI6bCo8+RrSKsONS2ylacNSEeZO/rG4A5L/NJ3i7xNE0CSx3BW1gnGWQZ1EZ9RB57j0jrjPIVseKOPRJFLEkqLBC4W4ZlJDdx8OQ9z6e9eRcVvJOKXnmOT/TrK7xRORzJOWbG2eX6CjgwyyPlIXn6jHiXFFa8nl4pcyXtymld/JgzkqMcyep7moSH0gA55ZPLP8AAqbnCyb7dTjGdqi6Ehc7kkYX9zXpKKiqR5E8jnLlIPwp2Xito2sRjWMMRtz/ACFNY1BYttLekhf3X+KU7LH+qW26sSwBJ5c+lOCR/wDh7ZcHH2ZMZ+8Nhup/z5UAfTLKyiU6lHqAyR335iiWk3qUHnr3B5H/ADt0oTplzuDkffxjPL73Y+9fWwDONYIYPjnvnf8AP9aW6ooTdmjY3UlnIJU3TOllJ5+xpoikS4hWWI6lYbGlNHjExjQ6o9XUY2xyq3wu+NlKA+TA+Mjt7/GpZw9l2Kd6YxaTmvmXAogIIDKcgjII61xqVY6ivivqmRXCK0ZBtUSKLjNRK1pMBRfht0iF3gYBfvVXEe3Q+4prtJvOTWDg8iO1VbrhPmSNJbuBk5KH9qzHqXdSNS6fVxMBUoqpVh7d42KupVgeRqUabjPSnOetClD7BquOe1adtwxZ4VdpCrHpjlUriLz41nRfujBTtV2KQEKwUj2qWeV1ophjV7KC2MlrcxsCJF1Y5dP8NUvEnGVsoZLeKUI+kiRw2PL9JPPufyyOpFMxIZcmvJr2GHiICXl3KFBDMf7jg7n8/qa7Cu7K5ejHUS7UKj7FvjPE5OJzbZW2VhpRupAxk/LYD5dSTmPnIAzksTt1NX76COK6kit3LxKw0ufhzqxw3gj3sLza1VUYgjOGbnz7D9d69f4xieD88kvtmOoxHIxIzuNXTl096jLjy1AwFyCQf3NW7m2kimmjKlihIJAwBtj5frQmiDKunDNqGP7RXegeHsnwcMeLWZAAHmLgsNufbtTeVZYbUMNOdBVCdjy3U9PgaWOFAf63ZHV5h8wc9l59KeTEksNuq90JikHP4UqUkmOxrlGysGDzNlsHRhiVwDv+IdKBGNLDGTg7r2G/LuOdXZbUvOFiMmFQnc4ddxyPWqsUUsMoKOpjclXVtscyOvpOflvQT0Mp2FUhn1D+7bf9/wB6Nb7qFbsAcGhICpD75DnO2N9+fY11GwRzOQPl7f58qFWbi92bXCL0wMLa4P2bbo/RfatwrSogEiDqMdPgKYeA3QnH9LdNiUL9mwP3h/NR5Y8dl+KXPRZ01ErV82je1BaAqaWpoa4MrYqOKs+Xvgb1NLVm3O1HmkdxbJiOFDqiUoc74O1FU7551WLV1ZCKS0Ov6DXsInjDjGpR9apQ2vm59WnA61djc1Fh5cmpetFSaVGZRTdn0FtLDJnK/WrJGDuMGoplhkH5V13WNdUg0gbljWG2xiSSJqNPwNeS3nD7xiyiNipycrv0NehL4o4UZ2iNyo0nBZvSBvjrWLJq07uB3I+FUYJSxtuiTqYQypKxOQWtsSXiDFWXBwQOXv8AqasR34iIKIQGkIEYO55/T51vS21i+DMWV8gls4Px7Cqj8OsZ5RGI9KaywGTljvz6n8qreWMvJF2Mkf0tGVe8Vgltprd4ARyIU4UbdT1pWujdTBZpIxFbkgJlcKcfqadp+AWEPrknfIYsY2IJK4GwAG3x3q3dSRrbACBI4Bp9T4JI+HaiskY/pQuWDJJ3NoSODwO3F7UlGYmRd5Ou4HLpzpzRvRCkh0qCuA5yPkenzrBSysRfvLC8szZQqr4AX1Dv/m9fcHv7lr2CEv5i6hjXv+fOt/uW0KvtVGXsa9xONeHUrhdTb9OR6/OhGJZCo5FGyTj1Y329+lSLJ52h1aH05IxlM5r5VbQnpDJqOnTuOvLqKVtFOmU3jZEOD6SxCsu2P4+BrsHqk1MRqwOlXx6iuMatRw3X68jUIIEGkj0gaQew57nt+lb5aM8aYSGHSAQfSenyFGhU5BDaWXBVuorttGIkVAMoBgZ547fpRfLJyUzkDelN2tlEVW0M3Dp5Lq0jklxr5NjuKsNoxjlWDweWRZhFq9DAkj5VqCVS5QOpYb6c7j5VDOHGVF0MnKIUeWvIVxpcbChE5qOM1yiHkBgaOdQ8UiuvcUcIBS74UuIv6QQhftzkyNkHrz/zbemIGlYcvdhZyWiQ2omx51Vu7u3soTNdyrHHnGpu9U08Q8JdgFvozk4Gx/im02G0vJrnCjOQFpG8V+JpxObREMbDBwdwoPI+5plvZmeUxA/Z7cuuRXn/ABmNZ+I3MkqPIwOFYDOMcqbhgrtk/UZHGPxFm9klSa5y3pLSHseYPwr0iXzNMRU5QJy5HlSdccNgnhmkdHjbTurZy21MzXc7P5cFrriEShXLYBbH6fWqJslxW7skVK5cLqGRuOnLrVV5UR10+nVJvhtuZ/FR5pWkGl5FGSCQg1n4dvyqo720ILsqLj8dw42+XL9Kxa9j+LfgE8sl3GyRRsSD94D27movwyaXElzcaAOgOSPnUZeO2iAk3isFGcRDbHx3/UVnTeJbUHVHCzMOTSnf9/1rDzRj7Nrp5S9GzZ2XD7e5Q6WZc+p8FtqPNwHht2+bWeISHfGdLfQ4NYPDuO3l5/US2sJ0W6FiyAbeknB1eymhp4zSbAu7KBweeFKN9QcflWPyknqzcuj5LdDBFZXXC5W8/wA90xhceoL/AJ7fnVOC7NrJc3CgBYjrwSFDe2Cd/wDaqdt4o4YBmO5vrLTvpRhIg/8Artj6Vzi/FIL/AIaWtbq3u5RJ96ANDN907FcDPyrsvUtwexP4ag06NyPiyyiO4WyYxNGXkcBh5Z66vbB5YqPBuPWvEk0tL5jhhhdLAjnsNuWx696WVuJ04LbRX0d48rGRYldzo5jmxwTgcts/nROHQXtvFdXDR2zQJHqCrIJlUjA0kjOnPUknl05ny+5k/lteB/GP0PMk0djEZp3CxqRk43z2x3+lL91x+EX1sJ7zyn1AxpoOMZHUHBJG3I+3vqcZuJ34e3k2fmufT9pgqAfxbZI6dPlSjBNZWqSw3VwYmUnEaqSyqRg5DMBjYHOO3OrOok5xVMVCKWj0CO98uwkvSWiKg4wmDnkANQ3+gpa4dx7iVxxSXVbSRYf7SXRraMc8Ecs/L4e9bi3FHm4ebSzWSOCHSzTRqhByBgsATvvvjl2qp4cvJv69ZJLlnSPOYolca9S9QdjjbpvUksjcVyGr6R6rayC4to5kDhWUEaxg0TBrlszNbRtIVJ0jBUEfrRKui9G6PM/D97dWtklwY4bS1lZvtIZCwQ6yuWU7/ezsK9DgYNEhWQyAqDr75615twZ7m94Lb2rJJCHWQBn+8rC4Y+22PyNa9/deI47qRLKCV41kKA5XDIMAMu+3Lr3qPDDtNv7DxZt+MIzccEMKlQ5lTGT0zSFBFJHeIPKbIkA+7sTmmG+Ti/ELS2F5bSpLbElpFVcygkbYyMbbVRtH4laSHVwniEoVsErHGCvLn9qavj1KxwFTxOcrGm1v/wCpsoriZVWRlBIUYA+vtWDdGOW4nkjvETzBjAf7v0PvWPe3F28U1tLwDisuSQGEabDOdjk/lWXLJElwWPhTjsn3hjyWIwxydlXlkD3xSPy2vEWaeFSVSGeVZ31+VdRaioCl1Zhn32qmL+acpbRSq1yI9WJISA3fG+30peueJIuHXwRdB1AP2lnOd+owRijf8R3SSsLHw1NAwOpZG4fISB/+edKy9VmlXGJ0MMYeClxziPFYWkj/AK1P+e0KKkqRZI5cyNjRbnhF7NeTG1LTKqjSNXq2XJojeM+Lm3ElxwyclGKgy2ratXQ+oHAxXLrxbx17AX0UE0ETnS5EGCT3/b2pSzZn5h/f+DdosJ4Z4i3BbtZuHuty7I8BwCWAGcHsKwr7wt4itYJ55rQxooZhow5wPgcVoQ+LeNzWDXTJcrHBL6wiE59zty5cula3hnxJLLdQxkyYlfBBBLdc5ydqVLP1EXfBUG2B8E2U1rwbirXMgYSKDucYHlS7UrT8CjtrpIWuWnDQM4cZAyrKOWexNMPh4X7W3FNdnLFGyM0a4A9JVlA3OT2pTjfiTcZS0UE3DqYgpOlly4GD23AyKvU9eDknY08H4RY21rdzGMNKisoLdc6sE9zsMdqHdz+fbpFe+WX8sFZiyRsi4Bzyyxzy3HT3rL4EOJNa8QjxIwUK2Aynqemrr7ZrMtr7iK2wiIlBUDzOj7AZB7VmTcl4MNOzci4hZQpJEge5C6SBLLIpkGcbADHzJ6Y7UycGuLSK8jFvb6IJYgWfXI8kY7ch1xtjByOfM+fcXnubS4tYkE6hX1RsDkN+IbAbncb/ABrW8OcQuIWv0jtpJZ4YpJAQq6U09R225/BcVPLG2Gh64b4n4mzvZ2iQmLL+qQEqNyAuWAPTr8OlK8dtcz3s1sTFbw6lErlwI2bsR1zv0P71Xtr7xDwyOZrzhtzF/UAmNckSMF9ZLAg/3A9MddqzuLcRuOIxreWNi0JlGZHGrLrhcE7YySw32zn4ElLJdegODGrhF8rX8KSSWlvB5xzGI2w2D0OMb+/5Vt2lrBYz3GmVkheQgyo2tXOkHBAB04J+i9K8t4dx+5jzNfWswUKY/Mjj3TsADjHPmSeZrWTxhecNsFe2RUd5BIWMYwUJGBjJ0n+evQz7jjxAsdM9y4bxG0ntkNnPFJGAB6Tjes7iniKa1ujbwQDUqhnEo3yc9jy2FeTWfjHiV1E/nRvcRvG3lxRwAyZI6YHIYz8q0vDvie7vI3B4bNeRJsML5mkjpvsPlWo5csVuIfYyeE7C4igtrAX880ia2kkkOSVYhtXX3A+VegRllVV1nYcqwfDPDo7GxVgzGSYa2JJOBzA3+OfnWzgDqTTB5a1d2P1qDKjZ1KrA89Q50FSKlkVwSDWVo3/ohf8AsJX9KE/DoiQUmnQjlhwf1FWQ2a+51wDOl4VOzZiv8bYxJCDn6EUGWw4gB6JLWT4lk/Y1sZwK+BGK4FC+68UiOWsHYD8UMqsPpkE/SqjcS8vULqGeEdfNiYD6kYps2xyr4NsApO3vXHCvwS+tL7imIJI5FAbOkg9DW9mNSNLKPhijeXH5vmmKPzByfSM/Wiea4GAaJ1AHBlieN0LI4KspBIYHmKz14JwqKUyjhdmHLaywgAOrnnPfO9a6u29cZ3OcqMfGhZ1GWOGcKU5ThluCCCCEAwaj/pPCgWIsIULHLELgk9yRzNaenO+ABmosoAyBgd6J1GJceGuBXUiPNZRO8Y0ozE5UdgfmfrRI/DXCYlZYITHqUq2GJyCNxWnqXG4zUSP7Diu0AxZvBvCpRuHGxGzMOfPkRUIvCFpbQyQW08scMhDMBI2cgbY7Dlkew7Vt+ey/eQH4GpiXO/7VxwtTeC7SWNonlkaF21SISCrnqSCu5qP/AAbaJELdLeCSD/5STpwcgDsP4FNGcn7xruB3NCkcY9j4dt7KNUE8giG/kxEhc+5JP7VppEIxiKJFH/SAKLt/aKkD22opIB//2Q=='][Math.round(Math.random())],
            capacity: faker.helpers.arrayElement(['200', '500', '750'])
        };

        const insertQuery = {
            text: 'INSERT INTO "location" (country, city, number, street, picture, capacity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            values: Object.values(location),
        };

        const result: QueryResult<any> = await client.query(insertQuery);
        ids.push(result.rows[0].id.toString());
    }

    return ids;
}