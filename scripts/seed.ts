import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless"; 


import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, {schema});

const main = async() => {
    try{
        console.log("Seeding database");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.courses).values([
            {
                id:1,
                title:"Spanish",
                imageSrc:"/es.svg",
            },
            {
                id:2,
                title:"French",
                imageSrc:"/fr.svg",
            },
            {
                id:3,
                title:"Italian",
                imageSrc:"/it.svg",
            },
            {
                id:4,
                title:"Japanese",
                imageSrc:"/jp.svg",
            },
            {
                id:5,
                title:"Croatian",
                imageSrc:"/hr.svg",
            },
        ]);


        await db.insert(schema.units).values([
            {
                id:1,
                courseId:1,
                title:"Unit 1",
                description:"Introduction to Spanish",
                order:1,
            }
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitID: 1,
                order: 1,
                title: "Nouns"
            },
            {
                id:2,
                unitID:1,
                order:2,
                title:"Verbs",
            },
            {
                id:3,
                unitID:1,
                order:3,
                title:"Adjectives",
            },
            {
                id:4,
                unitID:1,
                order:4,
                title:"Pronouns",
            },
            {
                id:5,
                unitID:1,
                order:5,
                title:"Prepositions",
            },
            
        ]);


        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: 'Which one of these is the "the man"?',
            },
            {
                id: 2,
                lessonId: 1,
                type: "ASSIST",
                order: 2,
                question: '"the man"',
            },
            {
                id: 3,
                lessonId: 1,
                type: "SELECT",
                order: 3,
                question: 'Which one of these is the "the Robot"?',
            },
            
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                id:1,
                challengeId:1,
                imageSrc:"/man.svg",
                correct:true,
                text:"el hombre",
                audioSrc:"/es_man.mp3",
            },
            {
                id:2,
                challengeId:1,
                imageSrc:"/woman.svg",
                correct:false,
                text:"la mujer",
                audioSrc:"/es_woman.mp3",
            },
            {
                id:3,
                challengeId:1,
                imageSrc:"/robot.svg",
                correct:false,
                text:"el robot",
                audioSrc:"/es_robot.mp3",
            },
        ]);
        await db.insert(schema.challengeOptions).values([
            {
                id:4,
                challengeId:2,
                correct:true,
                text:"el hombre",
                audioSrc:"/es_man.mp3",
            },
            {
                id:5,
                challengeId:2,
                correct:false,
                text:"la mujer",
                audioSrc:"/es_woman.mp3",
            },
            {
                id:6,
                challengeId:2,
                correct:false,
                text:"el robot",
                audioSrc:"/es_robot.mp3",
            },
        ]);
        await db.insert(schema.challengeOptions).values([
            {
                id:7,
                challengeId:3,
                imageSrc:"/man.svg",
                correct:false,
                text:"el hombre",
                audioSrc:"/es_man.mp3",
            },
            {
                id:8,
                challengeId:3,
                imageSrc:"/woman.svg",
                correct:false,
                text:"la mujer",
                audioSrc:"/es_woman.mp3",
            },
            {
                id:9,
                challengeId:3,
                imageSrc:"/robot.svg",
                correct:true,
                text:"el robot",
                audioSrc:"/es_robot.mp3",
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 4,
                lessonId: 2,
                type: "SELECT",
                order: 1,
                question: 'Which one of these is the "the man"?',
            },
            {
                id: 5,
                lessonId: 2,
                type: "ASSIST",
                order: 2,
                question: '"the man"',
            },
            {
                id: 6,
                lessonId: 2,
                type: "SELECT",
                order: 3,
                question: 'Which one of these is the "the Robot"?',
            },
            
        ]);


        console.log("Seeding finished");

    }catch(error){
        console.error(error);
        throw new Error("Failed to seed database");

    }
};

main();