import { notFoundError, unauthorizedError } from "@/errors";
import weeklyActivityRepository, { WeeklyActivityParams } from "@/repositories/weekly-repository";
import { ActionStatus } from "@prisma/client";

async function getWeeklyActivitiesByUserId(userId: number) {

  const weeklyActivities = await weeklyActivityRepository.findWeeklyActivitiesByUserId(userId);

  if (!weeklyActivities) {
    throw notFoundError();
  }
  return weeklyActivities;
}

async function getWeeklyActivityById(userId: number, weeklyActivityId: number) {

    const weeklyActivity = await weeklyActivityRepository.findWeeklyActivityById(weeklyActivityId);
  
    if (!weeklyActivity) {
      throw notFoundError();
    }

    if (weeklyActivity.userId !== userId){
      throw unauthorizedError();
    }

    return weeklyActivity;
}

async function createWeeklyActivity(weeklyActivityData: WeeklyActivityParams) {

  const weeklyActivity = await weeklyActivityRepository.createWeeklyActivity(weeklyActivityData);

  return weeklyActivity;
}

async function deleteWeeklyActivity(userId: number, weeklyActivityId: number) {
  
  const weeklyActivity = await weeklyActivityRepository.findWeeklyActivityById(weeklyActivityId); 

  if (weeklyActivity.userId !== userId){
    throw unauthorizedError();
  }
  await weeklyActivityRepository.deleteWeeklyActivityById(weeklyActivityId);
  
  return weeklyActivityId;
}

async function updateWeeklyActivity(userId: number, weeklyActivityId: number, status: ActionStatus) {
  
    const weeklyActivity = await weeklyActivityRepository.findWeeklyActivityById(weeklyActivityId); 
  
    if (weeklyActivity.userId !== userId){
      throw unauthorizedError();
    }
    const updatedWeeklyActivity = await weeklyActivityRepository.updateWeeklyActivityById(weeklyActivityId, status);
    
    return updatedWeeklyActivity;
}

const weeklyActivityService = {
  getWeeklyActivitiesByUserId,
  getWeeklyActivityById,
  createWeeklyActivity,
  deleteWeeklyActivity,
  updateWeeklyActivity
};

export default weeklyActivityService;
