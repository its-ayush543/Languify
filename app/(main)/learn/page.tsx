import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnit,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import { redirect } from "next/navigation";
import { Unit } from "./unit";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const unitsData = getUnit();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, units, courseProgress, lessonPercentage, userSubsciption] =
    await Promise.all([
      userProgressData,
      unitsData,
      courseProgressData,
      lessonPercentageData,
      userSubscriptionData
    ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses");
  }

  const isPro = !!userSubsciption?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6 ">
      <div>
        <StickyWrapper>
          <UserProgress
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={!!userSubsciption?.isActive}
          />
           {!isPro && <Promo />}
        <Quests points={userProgress.points} />
        </StickyWrapper>
      </div>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              title={unit.title}
              description={unit.description}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
