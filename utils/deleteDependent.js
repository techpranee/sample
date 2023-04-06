/**
  * deleteDependent.js
  * @description :: exports deleteDependent service for project.
*/

let Banner = require("../model/banner")
let Wallet = require("../model/wallet")
let Complaint = require("../model/complaint")
let Addon = require("../model/addon")
let Package = require("../model/package")
let Wash = require("../model/wash")
let Payment = require("../model/payment")
let Subscription = require("../model/subscription")
let Hub = require("../model/hub")
let Cleaner = require("../model/cleaner")
let Car = require("../model/car")
let User = require("../model/user")
let PushNotification = require("../model/pushNotification")
let UserTokens = require("../model/userTokens")
let Role = require("../model/role")
let ProjectRoute = require("../model/projectRoute")
let RouteRole = require("../model/routeRole")
let UserRole = require("../model/userRole")
let dbService = require(".//dbService");

const deleteBanner = async (filter) =>{
    try{
            let response  = await dbService.deleteMany(Banner,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteWallet = async (filter) =>{
    try{
            let response  = await dbService.deleteMany(Wallet,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteComplaint = async (filter) =>{
    try{
            let complaint = await dbService.findMany(Complaint,filter);
            if(complaint && complaint.length){
                complaint = complaint.map((obj) => obj.id);


                const washFilter = {$or: [{complaint_id : {$in : complaint }}]}
                    const washCnt=await dbService.deleteMany(Wash,washFilter);

            let deleted  = await dbService.deleteMany(Complaint,filter);
            let response = {wash :washCnt,}
            return response; 
            }else{
                return {  complaint : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deleteAddon = async (filter) =>{
    try{
            let response  = await dbService.deleteMany(Addon,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deletePackage = async (filter) =>{
    try{
            let package = await dbService.findMany(Package,filter);
            if(package && package.length){
                package = package.map((obj) => obj.id);


                const subscriptionFilter = {$or: [{package : {$in : package }}]}
                    const subscriptionCnt=await dbService.deleteMany(Subscription,subscriptionFilter);

            let deleted  = await dbService.deleteMany(Package,filter);
            let response = {subscription :subscriptionCnt,}
            return response; 
            }else{
                return {  package : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deleteWash = async (filter) =>{
    try{
            let wash = await dbService.findMany(Wash,filter);
            if(wash && wash.length){
                wash = wash.map((obj) => obj.id);


                const walletFilter = {$or: [{wash : {$in : wash }}]}
                    const walletCnt=await dbService.deleteMany(Wallet,walletFilter);

                const complaintFilter = {$or: [{wash : {$in : wash }}]}
                    const complaintCnt=await dbService.deleteMany(Complaint,complaintFilter);

            let deleted  = await dbService.deleteMany(Wash,filter);
            let response = {wallet :walletCnt,complaint :complaintCnt,}
            return response; 
            }else{
                return {  wash : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deletePayment = async (filter) =>{
    try{
            let payment = await dbService.findMany(Payment,filter);
            if(payment && payment.length){
                payment = payment.map((obj) => obj.id);


                const subscriptionFilter = {$or: [{paymentId : {$in : payment }}]}
                    const subscriptionCnt=await dbService.deleteMany(Subscription,subscriptionFilter);

            let deleted  = await dbService.deleteMany(Payment,filter);
            let response = {subscription :subscriptionCnt,}
            return response; 
            }else{
                return {  payment : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deleteSubscription = async (filter) =>{
    try{
            let response  = await dbService.deleteMany(Subscription,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteHub = async (filter) =>{
    try{
            let hub = await dbService.findMany(Hub,filter);
            if(hub && hub.length){
                hub = hub.map((obj) => obj.id);


                const complaintFilter = {$or: [{hub : {$in : hub }}]}
                    const complaintCnt=await dbService.deleteMany(Complaint,complaintFilter);

                const washFilter = {$or: [{hub : {$in : hub }}]}
                    const washCnt=await dbService.deleteMany(Wash,washFilter);

                const subscriptionFilter = {$or: [{hub : {$in : hub }}]}
                    const subscriptionCnt=await dbService.deleteMany(Subscription,subscriptionFilter);

                const cleanerFilter = {$or: [{hub : {$in : hub }}]}
                    const cleanerCnt=await dbService.deleteMany(Cleaner,cleanerFilter);

                const userFilter = {$or: [{hub : {$in : hub }}]}
                    const userCnt=await dbService.deleteMany(User,userFilter);

            let deleted  = await dbService.deleteMany(Hub,filter);
            let response = {complaint :complaintCnt,wash :washCnt,subscription :subscriptionCnt,cleaner :cleanerCnt,user :userCnt,}
            return response; 
            }else{
                return {  hub : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deleteCleaner = async (filter) =>{
    try{
            let cleaner = await dbService.findMany(Cleaner,filter);
            if(cleaner && cleaner.length){
                cleaner = cleaner.map((obj) => obj.id);


                const washFilter = {$or: [{cleanerId : {$in : cleaner }}]}
                    const washCnt=await dbService.deleteMany(Wash,washFilter);

            let deleted  = await dbService.deleteMany(Cleaner,filter);
            let response = {wash :washCnt,}
            return response; 
            }else{
                return {  cleaner : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deleteCar = async (filter) =>{
    try{
            let car = await dbService.findMany(Car,filter);
            if(car && car.length){
                car = car.map((obj) => obj.id);


                const washFilter = {$or: [{carId : {$in : car }}]}
                    const washCnt=await dbService.deleteMany(Wash,washFilter);

                const subscriptionFilter = {$or: [{car : {$in : car }}]}
                    const subscriptionCnt=await dbService.deleteMany(Subscription,subscriptionFilter);

            let deleted  = await dbService.deleteMany(Car,filter);
            let response = {wash :washCnt,subscription :subscriptionCnt,}
            return response; 
            }else{
                return {  car : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deleteUser = async (filter) =>{
    try{
            let user = await dbService.findMany(User,filter);
            if(user && user.length){
                user = user.map((obj) => obj.id);


                const walletFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }},{user : {$in : user }}]}
                    const walletCnt=await dbService.deleteMany(Wallet,walletFilter);

                const complaintFilter = {$or: [{owner : {$in : user }},{cleaner : {$in : user }}]}
                    const complaintCnt=await dbService.deleteMany(Complaint,complaintFilter);

                const washFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const washCnt=await dbService.deleteMany(Wash,washFilter);

                const paymentFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const paymentCnt=await dbService.deleteMany(Payment,paymentFilter);

                const subscriptionFilter = {$or: [{user : {$in : user }}]}
                    const subscriptionCnt=await dbService.deleteMany(Subscription,subscriptionFilter);

                const hubFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }},{owner : {$in : user }}]}
                    const hubCnt=await dbService.deleteMany(Hub,hubFilter);

                const cleanerFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }},{user : {$in : user }}]}
                    const cleanerCnt=await dbService.deleteMany(Cleaner,cleanerFilter);

                const carFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }},{owner : {$in : user }}]}
                    const carCnt=await dbService.deleteMany(Car,carFilter);

                const userTokensFilter = {$or: [{userId : {$in : user }},{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const userTokensCnt=await dbService.deleteMany(UserTokens,userTokensFilter);

                const roleFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const roleCnt=await dbService.deleteMany(Role,roleFilter);

                const projectRouteFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const projectRouteCnt=await dbService.deleteMany(ProjectRoute,projectRouteFilter);

                const routeRoleFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const routeRoleCnt=await dbService.deleteMany(RouteRole,routeRoleFilter);

                const userRoleFilter = {$or: [{userId : {$in : user }},{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const userRoleCnt=await dbService.deleteMany(UserRole,userRoleFilter);

            let deleted  = await dbService.deleteMany(User,filter);
            let response = {wallet :walletCnt,complaint :complaintCnt,wash :washCnt,payment :paymentCnt,subscription :subscriptionCnt,hub :hubCnt,cleaner :cleanerCnt,car :carCnt,userTokens :userTokensCnt,role :roleCnt,projectRoute :projectRouteCnt,routeRole :routeRoleCnt,userRole :userRoleCnt,}
            return response; 
            }else{
                return {  user : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deletePushNotification = async (filter) =>{
    try{
            let response  = await dbService.deleteMany(PushNotification,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteUserTokens = async (filter) =>{
    try{
            let response  = await dbService.deleteMany(UserTokens,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteRole = async (filter) =>{
    try{
            let role = await dbService.findMany(Role,filter);
            if(role && role.length){
                role = role.map((obj) => obj.id);


                const routeRoleFilter = {$or: [{roleId : {$in : role }}]}
                    const routeRoleCnt=await dbService.deleteMany(RouteRole,routeRoleFilter);

                const userRoleFilter = {$or: [{roleId : {$in : role }}]}
                    const userRoleCnt=await dbService.deleteMany(UserRole,userRoleFilter);

            let deleted  = await dbService.deleteMany(Role,filter);
            let response = {routeRole :routeRoleCnt,userRole :userRoleCnt,}
            return response; 
            }else{
                return {  role : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deleteProjectRoute = async (filter) =>{
    try{
            let projectroute = await dbService.findMany(ProjectRoute,filter);
            if(projectroute && projectroute.length){
                projectroute = projectroute.map((obj) => obj.id);


                const routeRoleFilter = {$or: [{routeId : {$in : projectroute }}]}
                    const routeRoleCnt=await dbService.deleteMany(RouteRole,routeRoleFilter);

            let deleted  = await dbService.deleteMany(ProjectRoute,filter);
            let response = {routeRole :routeRoleCnt,}
            return response; 
            }else{
                return {  projectroute : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deleteRouteRole = async (filter) =>{
    try{
            let response  = await dbService.deleteMany(RouteRole,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteUserRole = async (filter) =>{
    try{
            let response  = await dbService.deleteMany(UserRole,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const countBanner = async (filter) =>{
    try{
        const bannerCnt =  await dbService.count(Banner,filter);
        return {banner : bannerCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countWallet = async (filter) =>{
    try{
        const walletCnt =  await dbService.count(Wallet,filter);
        return {wallet : walletCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countComplaint = async (filter) =>{
    try{
        let complaint = await dbService.findMany(Complaint,filter);
        if(complaint && complaint.length){
            complaint = complaint.map((obj) => obj.id);

                const washFilter = {$or: [{complaint_id : {$in : complaint }}]}
                     const washCnt =  await dbService.count(Wash,washFilter);

            let response = {wash : washCnt,}
            return response; 
        }else{
            return {  complaint : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countAddon = async (filter) =>{
    try{
        const addonCnt =  await dbService.count(Addon,filter);
        return {addon : addonCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countPackage = async (filter) =>{
    try{
        let package = await dbService.findMany(Package,filter);
        if(package && package.length){
            package = package.map((obj) => obj.id);

                const subscriptionFilter = {$or: [{package : {$in : package }}]}
                     const subscriptionCnt =  await dbService.count(Subscription,subscriptionFilter);

            let response = {subscription : subscriptionCnt,}
            return response; 
        }else{
            return {  package : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countWash = async (filter) =>{
    try{
        let wash = await dbService.findMany(Wash,filter);
        if(wash && wash.length){
            wash = wash.map((obj) => obj.id);

                const walletFilter = {$or: [{wash : {$in : wash }}]}
                     const walletCnt =  await dbService.count(Wallet,walletFilter);

                const complaintFilter = {$or: [{wash : {$in : wash }}]}
                     const complaintCnt =  await dbService.count(Complaint,complaintFilter);

            let response = {wallet : walletCnt,complaint : complaintCnt,}
            return response; 
        }else{
            return {  wash : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countPayment = async (filter) =>{
    try{
        let payment = await dbService.findMany(Payment,filter);
        if(payment && payment.length){
            payment = payment.map((obj) => obj.id);

                const subscriptionFilter = {$or: [{paymentId : {$in : payment }}]}
                     const subscriptionCnt =  await dbService.count(Subscription,subscriptionFilter);

            let response = {subscription : subscriptionCnt,}
            return response; 
        }else{
            return {  payment : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countSubscription = async (filter) =>{
    try{
        const subscriptionCnt =  await dbService.count(Subscription,filter);
        return {subscription : subscriptionCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countHub = async (filter) =>{
    try{
        let hub = await dbService.findMany(Hub,filter);
        if(hub && hub.length){
            hub = hub.map((obj) => obj.id);

                const complaintFilter = {$or: [{hub : {$in : hub }}]}
                     const complaintCnt =  await dbService.count(Complaint,complaintFilter);

                const washFilter = {$or: [{hub : {$in : hub }}]}
                     const washCnt =  await dbService.count(Wash,washFilter);

                const subscriptionFilter = {$or: [{hub : {$in : hub }}]}
                     const subscriptionCnt =  await dbService.count(Subscription,subscriptionFilter);

                const cleanerFilter = {$or: [{hub : {$in : hub }}]}
                     const cleanerCnt =  await dbService.count(Cleaner,cleanerFilter);

                const userFilter = {$or: [{hub : {$in : hub }}]}
                     const userCnt =  await dbService.count(User,userFilter);

            let response = {complaint : complaintCnt,wash : washCnt,subscription : subscriptionCnt,cleaner : cleanerCnt,user : userCnt,}
            return response; 
        }else{
            return {  hub : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countCleaner = async (filter) =>{
    try{
        let cleaner = await dbService.findMany(Cleaner,filter);
        if(cleaner && cleaner.length){
            cleaner = cleaner.map((obj) => obj.id);

                const washFilter = {$or: [{cleanerId : {$in : cleaner }}]}
                     const washCnt =  await dbService.count(Wash,washFilter);

            let response = {wash : washCnt,}
            return response; 
        }else{
            return {  cleaner : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countCar = async (filter) =>{
    try{
        let car = await dbService.findMany(Car,filter);
        if(car && car.length){
            car = car.map((obj) => obj.id);

                const washFilter = {$or: [{carId : {$in : car }}]}
                     const washCnt =  await dbService.count(Wash,washFilter);

                const subscriptionFilter = {$or: [{car : {$in : car }}]}
                     const subscriptionCnt =  await dbService.count(Subscription,subscriptionFilter);

            let response = {wash : washCnt,subscription : subscriptionCnt,}
            return response; 
        }else{
            return {  car : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countUser = async (filter) =>{
    try{
        let user = await dbService.findMany(User,filter);
        if(user && user.length){
            user = user.map((obj) => obj.id);

                const walletFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }},{user : {$in : user }}]}
                     const walletCnt =  await dbService.count(Wallet,walletFilter);

                const complaintFilter = {$or: [{owner : {$in : user }},{cleaner : {$in : user }}]}
                     const complaintCnt =  await dbService.count(Complaint,complaintFilter);

                const washFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const washCnt =  await dbService.count(Wash,washFilter);

                const paymentFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const paymentCnt =  await dbService.count(Payment,paymentFilter);

                const subscriptionFilter = {$or: [{user : {$in : user }}]}
                     const subscriptionCnt =  await dbService.count(Subscription,subscriptionFilter);

                const hubFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }},{owner : {$in : user }}]}
                     const hubCnt =  await dbService.count(Hub,hubFilter);

                const cleanerFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }},{user : {$in : user }}]}
                     const cleanerCnt =  await dbService.count(Cleaner,cleanerFilter);

                const carFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }},{owner : {$in : user }}]}
                     const carCnt =  await dbService.count(Car,carFilter);

                const userTokensFilter = {$or: [{userId : {$in : user }},{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

                const roleFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const roleCnt =  await dbService.count(Role,roleFilter);

                const projectRouteFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const projectRouteCnt =  await dbService.count(ProjectRoute,projectRouteFilter);

                const routeRoleFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

                const userRoleFilter = {$or: [{userId : {$in : user }},{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

            let response = {wallet : walletCnt,complaint : complaintCnt,wash : washCnt,payment : paymentCnt,subscription : subscriptionCnt,hub : hubCnt,cleaner : cleanerCnt,car : carCnt,userTokens : userTokensCnt,role : roleCnt,projectRoute : projectRouteCnt,routeRole : routeRoleCnt,userRole : userRoleCnt,}
            return response; 
        }else{
            return {  user : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countPushNotification = async (filter) =>{
    try{
        const pushNotificationCnt =  await dbService.count(PushNotification,filter);
        return {pushNotification : pushNotificationCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countUserTokens = async (filter) =>{
    try{
        const userTokensCnt =  await dbService.count(UserTokens,filter);
        return {userTokens : userTokensCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countRole = async (filter) =>{
    try{
        let role = await dbService.findMany(Role,filter);
        if(role && role.length){
            role = role.map((obj) => obj.id);

                const routeRoleFilter = {$or: [{roleId : {$in : role }}]}
                     const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

                const userRoleFilter = {$or: [{roleId : {$in : role }}]}
                     const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

            let response = {routeRole : routeRoleCnt,userRole : userRoleCnt,}
            return response; 
        }else{
            return {  role : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countProjectRoute = async (filter) =>{
    try{
        let projectroute = await dbService.findMany(ProjectRoute,filter);
        if(projectroute && projectroute.length){
            projectroute = projectroute.map((obj) => obj.id);

                const routeRoleFilter = {$or: [{routeId : {$in : projectroute }}]}
                     const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

            let response = {routeRole : routeRoleCnt,}
            return response; 
        }else{
            return {  projectroute : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countRouteRole = async (filter) =>{
    try{
        const routeRoleCnt =  await dbService.count(RouteRole,filter);
        return {routeRole : routeRoleCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countUserRole = async (filter) =>{
    try{
        const userRoleCnt =  await dbService.count(UserRole,filter);
        return {userRole : userRoleCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteBanner = async (filter,updateBody) =>{  
      try{
        const bannerCnt =  await dbService.updateMany(Banner,filter);
        return {banner : bannerCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteWallet = async (filter,updateBody) =>{  
      try{
        const walletCnt =  await dbService.updateMany(Wallet,filter);
        return {wallet : walletCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteComplaint = async (filter,updateBody) =>{  
      try{
        let complaint = await dbService.findMany(Complaint,filter, {id:1});
        if(complaint.length){
            complaint = complaint.map((obj) => obj.id);

                    const washFilter = {"$or": [{complaint_id : {"$in" : complaint }}]}
                     const washCnt = await dbService.updateMany(Wash,washFilter,updateBody);
              let updated = await dbService.updateMany(Complaint,filter,updateBody);

            let response = {wash :washCnt,}
            return response;
        }else{
            return {  complaint : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteAddon = async (filter,updateBody) =>{  
      try{
        const addonCnt =  await dbService.updateMany(Addon,filter);
        return {addon : addonCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeletePackage = async (filter,updateBody) =>{  
      try{
        let package = await dbService.findMany(Package,filter, {id:1});
        if(package.length){
            package = package.map((obj) => obj.id);

                    const subscriptionFilter = {"$or": [{package : {"$in" : package }}]}
                     const subscriptionCnt = await dbService.updateMany(Subscription,subscriptionFilter,updateBody);
              let updated = await dbService.updateMany(Package,filter,updateBody);

            let response = {subscription :subscriptionCnt,}
            return response;
        }else{
            return {  package : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteWash = async (filter,updateBody) =>{  
      try{
        let wash = await dbService.findMany(Wash,filter, {id:1});
        if(wash.length){
            wash = wash.map((obj) => obj.id);

                    const walletFilter = {"$or": [{wash : {"$in" : wash }}]}
                     const walletCnt = await dbService.updateMany(Wallet,walletFilter,updateBody);

                    const complaintFilter = {"$or": [{wash : {"$in" : wash }}]}
                     const complaintCnt = await dbService.updateMany(Complaint,complaintFilter,updateBody);
              let updated = await dbService.updateMany(Wash,filter,updateBody);

            let response = {wallet :walletCnt,complaint :complaintCnt,}
            return response;
        }else{
            return {  wash : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeletePayment = async (filter,updateBody) =>{  
      try{
        let payment = await dbService.findMany(Payment,filter, {id:1});
        if(payment.length){
            payment = payment.map((obj) => obj.id);

                    const subscriptionFilter = {"$or": [{paymentId : {"$in" : payment }}]}
                     const subscriptionCnt = await dbService.updateMany(Subscription,subscriptionFilter,updateBody);
              let updated = await dbService.updateMany(Payment,filter,updateBody);

            let response = {subscription :subscriptionCnt,}
            return response;
        }else{
            return {  payment : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteSubscription = async (filter,updateBody) =>{  
      try{
        const subscriptionCnt =  await dbService.updateMany(Subscription,filter);
        return {subscription : subscriptionCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteHub = async (filter,updateBody) =>{  
      try{
        let hub = await dbService.findMany(Hub,filter, {id:1});
        if(hub.length){
            hub = hub.map((obj) => obj.id);

                    const complaintFilter = {"$or": [{hub : {"$in" : hub }}]}
                     const complaintCnt = await dbService.updateMany(Complaint,complaintFilter,updateBody);

                    const washFilter = {"$or": [{hub : {"$in" : hub }}]}
                     const washCnt = await dbService.updateMany(Wash,washFilter,updateBody);

                    const subscriptionFilter = {"$or": [{hub : {"$in" : hub }}]}
                     const subscriptionCnt = await dbService.updateMany(Subscription,subscriptionFilter,updateBody);

                    const cleanerFilter = {"$or": [{hub : {"$in" : hub }}]}
                     const cleanerCnt = await dbService.updateMany(Cleaner,cleanerFilter,updateBody);

                    const userFilter = {"$or": [{hub : {"$in" : hub }}]}
                     const userCnt = await dbService.updateMany(User,userFilter,updateBody);
              let updated = await dbService.updateMany(Hub,filter,updateBody);

            let response = {complaint :complaintCnt,wash :washCnt,subscription :subscriptionCnt,cleaner :cleanerCnt,user :userCnt,}
            return response;
        }else{
            return {  hub : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteCleaner = async (filter,updateBody) =>{  
      try{
        let cleaner = await dbService.findMany(Cleaner,filter, {id:1});
        if(cleaner.length){
            cleaner = cleaner.map((obj) => obj.id);

                    const washFilter = {"$or": [{cleanerId : {"$in" : cleaner }}]}
                     const washCnt = await dbService.updateMany(Wash,washFilter,updateBody);
              let updated = await dbService.updateMany(Cleaner,filter,updateBody);

            let response = {wash :washCnt,}
            return response;
        }else{
            return {  cleaner : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteCar = async (filter,updateBody) =>{  
      try{
        let car = await dbService.findMany(Car,filter, {id:1});
        if(car.length){
            car = car.map((obj) => obj.id);

                    const washFilter = {"$or": [{carId : {"$in" : car }}]}
                     const washCnt = await dbService.updateMany(Wash,washFilter,updateBody);

                    const subscriptionFilter = {"$or": [{car : {"$in" : car }}]}
                     const subscriptionCnt = await dbService.updateMany(Subscription,subscriptionFilter,updateBody);
              let updated = await dbService.updateMany(Car,filter,updateBody);

            let response = {wash :washCnt,subscription :subscriptionCnt,}
            return response;
        }else{
            return {  car : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteUser = async (filter,updateBody) =>{  
      try{
        let user = await dbService.findMany(User,filter, {id:1});
        if(user.length){
            user = user.map((obj) => obj.id);

                    const walletFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }},{user : {"$in" : user }}]}
                     const walletCnt = await dbService.updateMany(Wallet,walletFilter,updateBody);

                    const complaintFilter = {"$or": [{owner : {"$in" : user }},{cleaner : {"$in" : user }}]}
                     const complaintCnt = await dbService.updateMany(Complaint,complaintFilter,updateBody);

                    const washFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const washCnt = await dbService.updateMany(Wash,washFilter,updateBody);

                    const paymentFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const paymentCnt = await dbService.updateMany(Payment,paymentFilter,updateBody);

                    const subscriptionFilter = {"$or": [{user : {"$in" : user }}]}
                     const subscriptionCnt = await dbService.updateMany(Subscription,subscriptionFilter,updateBody);

                    const hubFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }},{owner : {"$in" : user }}]}
                     const hubCnt = await dbService.updateMany(Hub,hubFilter,updateBody);

                    const cleanerFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }},{user : {"$in" : user }}]}
                     const cleanerCnt = await dbService.updateMany(Cleaner,cleanerFilter,updateBody);

                    const carFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }},{owner : {"$in" : user }}]}
                     const carCnt = await dbService.updateMany(Car,carFilter,updateBody);

                    const userTokensFilter = {"$or": [{userId : {"$in" : user }},{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const userTokensCnt = await dbService.updateMany(UserTokens,userTokensFilter,updateBody);

                    const roleFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const roleCnt = await dbService.updateMany(Role,roleFilter,updateBody);

                    const projectRouteFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const projectRouteCnt = await dbService.updateMany(ProjectRoute,projectRouteFilter,updateBody);

                    const routeRoleFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

                    const userRoleFilter = {"$or": [{userId : {"$in" : user }},{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
              let updated = await dbService.updateMany(User,filter,updateBody);

            let response = {wallet :walletCnt,complaint :complaintCnt,wash :washCnt,payment :paymentCnt,subscription :subscriptionCnt,hub :hubCnt,cleaner :cleanerCnt,car :carCnt,userTokens :userTokensCnt,role :roleCnt,projectRoute :projectRouteCnt,routeRole :routeRoleCnt,userRole :userRoleCnt,}
            return response;
        }else{
            return {  user : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeletePushNotification = async (filter,updateBody) =>{  
      try{
        const pushNotificationCnt =  await dbService.updateMany(PushNotification,filter);
        return {pushNotification : pushNotificationCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteUserTokens = async (filter,updateBody) =>{  
      try{
        const userTokensCnt =  await dbService.updateMany(UserTokens,filter);
        return {userTokens : userTokensCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteRole = async (filter,updateBody) =>{  
      try{
        let role = await dbService.findMany(Role,filter, {id:1});
        if(role.length){
            role = role.map((obj) => obj.id);

                    const routeRoleFilter = {"$or": [{roleId : {"$in" : role }}]}
                     const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

                    const userRoleFilter = {"$or": [{roleId : {"$in" : role }}]}
                     const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
              let updated = await dbService.updateMany(Role,filter,updateBody);

            let response = {routeRole :routeRoleCnt,userRole :userRoleCnt,}
            return response;
        }else{
            return {  role : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteProjectRoute = async (filter,updateBody) =>{  
      try{
        let projectroute = await dbService.findMany(ProjectRoute,filter, {id:1});
        if(projectroute.length){
            projectroute = projectroute.map((obj) => obj.id);

                    const routeRoleFilter = {"$or": [{routeId : {"$in" : projectroute }}]}
                     const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);
              let updated = await dbService.updateMany(ProjectRoute,filter,updateBody);

            let response = {routeRole :routeRoleCnt,}
            return response;
        }else{
            return {  projectroute : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteRouteRole = async (filter,updateBody) =>{  
      try{
        const routeRoleCnt =  await dbService.updateMany(RouteRole,filter);
        return {routeRole : routeRoleCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteUserRole = async (filter,updateBody) =>{  
      try{
        const userRoleCnt =  await dbService.updateMany(UserRole,filter);
        return {userRole : userRoleCnt}
    }catch(error){
        throw new Error(error.message);
    }
}



module.exports ={
    deleteBanner,
    deleteWallet,
    deleteComplaint,
    deleteAddon,
    deletePackage,
    deleteWash,
    deletePayment,
    deleteSubscription,
    deleteHub,
    deleteCleaner,
    deleteCar,
    deleteUser,
    deletePushNotification,
    deleteUserTokens,
    deleteRole,
    deleteProjectRoute,
    deleteRouteRole,
    deleteUserRole,
    countBanner,
    countWallet,
    countComplaint,
    countAddon,
    countPackage,
    countWash,
    countPayment,
    countSubscription,
    countHub,
    countCleaner,
    countCar,
    countUser,
    countPushNotification,
    countUserTokens,
    countRole,
    countProjectRoute,
    countRouteRole,
    countUserRole,
    softDeleteBanner,
    softDeleteWallet,
    softDeleteComplaint,
    softDeleteAddon,
    softDeletePackage,
    softDeleteWash,
    softDeletePayment,
    softDeleteSubscription,
    softDeleteHub,
    softDeleteCleaner,
    softDeleteCar,
    softDeleteUser,
    softDeletePushNotification,
    softDeleteUserTokens,
    softDeleteRole,
    softDeleteProjectRoute,
    softDeleteRouteRole,
    softDeleteUserRole,
}


