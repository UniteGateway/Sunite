package com.example.data.dao

import androidx.room.*
import com.example.data.entity.BranchEntity
import com.example.data.entity.DepartmentEntity
import com.example.data.entity.OrganizationEntity
import com.example.data.entity.RoleEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface OrgDao {
    @Query("SELECT * FROM organization LIMIT 1")
    fun getOrganizationFlow(): Flow<OrganizationEntity?>

    @Query("SELECT * FROM organization LIMIT 1")
    suspend fun getOrganization(): OrganizationEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrganization(org: OrganizationEntity)

    @Query("SELECT * FROM branches ORDER BY name ASC")
    fun getAllBranches(): Flow<List<BranchEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertBranches(branches: List<BranchEntity>)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertBranch(branch: BranchEntity)

    @Update
    suspend fun updateBranch(branch: BranchEntity)

    @Query("DELETE FROM branches WHERE id = :id")
    suspend fun deleteBranch(id: String)

    @Query("SELECT * FROM departments ORDER BY code ASC")
    fun getAllDepartments(): Flow<List<DepartmentEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertDepartments(departments: List<DepartmentEntity>)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertDepartment(dept: DepartmentEntity)

    @Query("SELECT * FROM roles ORDER BY name ASC")
    fun getAllRoles(): Flow<List<RoleEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertRoles(roles: List<RoleEntity>)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertRole(role: RoleEntity)

    @Update
    suspend fun updateRole(role: RoleEntity)
}
