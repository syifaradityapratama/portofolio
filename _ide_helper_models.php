<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $color
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Project> $projects
 * @property-read int|null $projects_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereUpdatedAt($value)
 */
	class Category extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $issuer
 * @property \Illuminate\Support\Carbon $issued_at
 * @property string|null $credential_url
 * @property string|null $image
 * @property bool $is_featured
 * @property int $sort_order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate whereCredentialUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate whereIsFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate whereIssuedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate whereIssuer($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate whereUpdatedAt($value)
 */
	class Certificate extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $type
 * @property string $title
 * @property string $company
 * @property string $period
 * @property string|null $description
 * @property int $sort_order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Experience newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Experience newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Experience query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Experience whereCompany($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Experience whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Experience whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Experience whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Experience wherePeriod($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Experience whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Experience whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Experience whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Experience whereUpdatedAt($value)
 */
	class Experience extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $message
 * @property bool $is_read
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereIsRead($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Message whereUpdatedAt($value)
 */
	class Message extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $role
 * @property string $bio
 * @property int $is_open_to_work
 * @property string|null $image
 * @property string|null $logo
 * @property string|null $resume
 * @property string|null $linkedin
 * @property string|null $github
 * @property string|null $whatsapp
 * @property string|null $google_analytics_id
 * @property string|null $instagram
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereBio($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereGithub($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereGoogleAnalyticsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereInstagram($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereIsOpenToWork($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereLinkedin($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereResume($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereWhatsapp($value)
 */
	class Profile extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $category_id
 * @property string $title
 * @property string $slug
 * @property string|null $thumbnail
 * @property string $short_description
 * @property string|null $content
 * @property array<array-key, mixed>|null $gallery
 * @property array<array-key, mixed>|null $tech_stack
 * @property string|null $live_link
 * @property string|null $github_link
 * @property bool $is_featured
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Category $category
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\TechStack> $techStacks
 * @property-read int|null $tech_stacks_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereGallery($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereGithubLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereIsFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereLiveLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereShortDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereTechStack($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereThumbnail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereUpdatedAt($value)
 */
	class Project extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $title
 * @property string $icon
 * @property string $description
 * @property int $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Service newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Service newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Service query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Service whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Service whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Service whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Service whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Service whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Service whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Service whereUpdatedAt($value)
 */
	class Service extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string|null $image
 * @property string|null $url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Project> $projects
 * @property-read int|null $projects_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TechStack newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TechStack newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TechStack query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TechStack whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TechStack whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TechStack whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TechStack whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TechStack whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TechStack whereUrl($value)
 */
	class TechStack extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 */
	class User extends \Eloquent implements \Filament\Models\Contracts\FilamentUser {}
}

